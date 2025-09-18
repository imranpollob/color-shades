'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const LIGHT_SHADES = 10;
const DARK_SHADES = 10;
const DEFAULT_COLOR = '#1C902F';
const HEX_DIGITS = '0123456789ABCDEF';

function normalizeHex(value) {
  if (!value) return null;

  let hex = value.trim().replace(/\s+/g, '');
  hex = hex.replace(/[^0-9A-Fa-f#]/g, '');

  if (!hex.startsWith('#')) {
    hex = `#${hex.replace(/#/g, '')}`;
  } else {
    hex = `#${hex.slice(1).replace(/#/g, '')}`;
  }

  if (hex.length > 7) {
    hex = hex.slice(0, 7);
  }

  if (/^#([0-9A-F]{6})$/i.test(hex)) {
    return hex.toUpperCase();
  }

  return null;
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return [0, 0, 0];

  const bigint = parseInt(normalized.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return (
    '#'
    + ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

function mixHex(baseHex, targetHex, amount) {
  const [r1, g1, b1] = hexToRgb(baseHex);
  const [r2, g2, b2] = hexToRgb(targetHex);
  const clamp = (value) => Math.min(255, Math.max(0, value));
  const blend = (start, end) => clamp(Math.round(start + (end - start) * amount));
  return rgbToHex(blend(r1, r2), blend(g1, g2), blend(b1, b2));
}

function randomHexColor() {
  let hex = '#';
  for (let i = 0; i < 6; i += 1) {
    hex += HEX_DIGITS[Math.floor(Math.random() * HEX_DIGITS.length)];
  }
  return hex;
}

function generateLighterShades(hex, steps) {
  const [r, g, b] = hexToRgb(hex);
  const shades = [];
  for (let i = 1; i <= steps - 1; i++) {
    const factor = i / steps;
    const newR = Math.round(r + (255 - r) * factor);
    const newG = Math.round(g + (255 - g) * factor);
    const newB = Math.round(b + (255 - b) * factor);
    shades.push(rgbToHex(newR, newG, newB));
  }
  return shades;
}

function generateDarkerShades(hex, steps) {
  const [r, g, b] = hexToRgb(hex);
  const shades = [];
  for (let i = 1; i <= steps - 1; i++) {
    const factor = i / steps;
    const newR = Math.round(r * (1 - factor));
    const newG = Math.round(g * (1 - factor));
    const newB = Math.round(b * (1 - factor));
    shades.push(rgbToHex(newR, newG, newB));
  }
  return shades;
}

function getReadableTextColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#1F2933' : '#F9FAFB';
}

function buildTiles(baseHex, variants, steps, direction) {
  const tiles = [
    {
      hex: baseHex,
      label: 'Base',
      direction,
      textColor: getReadableTextColor(baseHex)
    }
  ];

  for (let i = 0; i < variants.length; i++) {
    const percent = Math.round(((i + 1) / steps) * 100);
    tiles.push({
      hex: variants[i],
      direction,
      label: `${direction === 'lighter' ? '+' : '-'}${percent}%`,
      textColor: getReadableTextColor(variants[i])
    });
  }

  return tiles;
}

export default function Page() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [hexInput, setHexInput] = useState(DEFAULT_COLOR);
  const [copiedHex, setCopiedHex] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const toastTimerRef = useRef(null);
  const [activeColor, setActiveColor] = useState(DEFAULT_COLOR);
  const originalBodyBackgroundRef = useRef('');
  const originalBodyTransitionRef = useRef('');
  const originalRootBackgroundRef = useRef('');

  const { lighterTiles, darkerTiles } = useMemo(() => {
    const lighter = generateLighterShades(color, LIGHT_SHADES);
    const darker = generateDarkerShades(color, DARK_SHADES);

    const lighterTiles = buildTiles(color, lighter, LIGHT_SHADES, 'lighter');
    const darkerTiles = buildTiles(color, darker, DARK_SHADES, 'darker');

    return {
      lighterTiles,
      darkerTiles
    };
  }, [color]);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToastMessage('');
    setCopiedHex('');
  }, []);

  useEffect(() => {
    setHexInput(color);
    dismissToast();
  }, [color, dismissToast]);

  useEffect(() => () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
  }, []);

  useEffect(() => {
    originalBodyBackgroundRef.current = document.body.style.backgroundColor;
    originalBodyTransitionRef.current = document.body.style.transition;
    document.body.style.transition = 'background-color 0.6s ease';
    const computed = getComputedStyle(document.documentElement);
    originalRootBackgroundRef.current = computed.getPropertyValue('--page-background');

    return () => {
      document.body.style.backgroundColor = originalBodyBackgroundRef.current;
      document.body.style.transition = originalBodyTransitionRef.current;
      if (originalRootBackgroundRef.current) {
        document.documentElement.style.setProperty('--page-background', originalRootBackgroundRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const nextBackground = activeColor;
    document.body.style.backgroundColor = nextBackground;
    document.documentElement.style.setProperty('--page-background', nextBackground);
  }, [activeColor]);

  const showToast = useCallback((message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
      setCopiedHex('');
      toastTimerRef.current = null;
    }, 2000);
  }, []);

  const handleHexInput = useCallback((event) => {
    let value = event.target.value.replace(/[^0-9A-Fa-f#]/g, '');
    value = value.replace(/(?!^)#/g, '');

    if (value.length === 0) {
      setHexInput('');
      return;
    }

    if (!value.startsWith('#')) {
      value = `#${value}`;
    }

    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    const next = value.toUpperCase();
    setHexInput(next);
    const normalized = normalizeHex(next);
    if (normalized) {
      setColor(normalized);
      setActiveColor(normalized);
    }
  }, []);

  const handleHexBlur = useCallback(() => {
    setHexInput(color);
  }, [color]);

  const handleColorPicker = useCallback((event) => {
    const next = normalizeHex(event.target.value);
    if (next) {
      setColor(next);
      setActiveColor(next);
    }
  }, []);

  const handleRandomize = useCallback(() => {
    const next = randomHexColor();
    setColor(next);
    setHexInput(next);
    setActiveColor(next);
  }, []);

  const copyShade = useCallback(async (hex) => {
    setActiveColor(hex);

    if (!navigator?.clipboard) {
      showToast('Clipboard access is unavailable in this browser.');
      return;
    }

    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      showToast(`${hex} copied to clipboard`);
    } catch (error) {
      console.error('Copy failed', error);
      showToast('Copy failed. Please try again.');
    }
  }, [showToast]);
  return (
    <main className="container">
      <section className="controls" aria-label="Color input controls">
        <header className="controls-header">
          <h1>Color Shade Generator</h1>
          <p>
            Create lighter and darker shades of your color and copy them instantly.
          </p>
        </header>
        <label className="control-label" htmlFor="color-picker">
          Select a Base Color
        </label>
        <div className="control-group">
          <input
            id="color-picker"
            type="color"
            value={color}
            onChange={handleColorPicker}
            aria-label="Pick a base color"
          />
          <input
            id="hex-input"
            className="hex-input"
            value={hexInput}
            onChange={handleHexInput}
            onBlur={handleHexBlur}
            placeholder="#1C902F"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-label="Color hex value"
          />
          <button type="button" className="randomize" onClick={handleRandomize}>
            <span aria-hidden="true" className="randomize-icon">🎲</span>
            Random Color
          </button>
        </div>
      </section>

      <section className="palette" aria-label="Generated color shades">
        <div className="palette-row">
          <header>
            <h2>Lighter shades</h2>
            <p>Toward white</p>
          </header>
          <div className="shade-row">
            {lighterTiles.map((tile, index) => (
              <button
                key={`${tile.direction}-${index}`}
                type="button"
                className="shade-tile"
                style={{
                  '--shade': tile.hex,
                  '--text': tile.textColor
                }}
                onClick={() => copyShade(tile.hex)}
                aria-label={`Copy ${tile.label} shade ${tile.hex}`}
              >
                <span className="shade-label">{tile.label}</span>
                <span className="shade-hex">{tile.hex}</span>
                {copiedHex === tile.hex && <span className="shade-feedback">Copied</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="palette-row">
          <header>
            <h2>Darker shades</h2>
            <p>Toward black</p>
          </header>
          <div className="shade-row">
            {darkerTiles.map((tile, index) => (
              <button
                key={`${tile.direction}-${index}`}
                type="button"
                className="shade-tile"
                style={{
                  '--shade': tile.hex,
                  '--text': tile.textColor
                }}
                onClick={() => copyShade(tile.hex)}
                aria-label={`Copy ${tile.label} shade ${tile.hex}`}
              >
                <span className="shade-label">{tile.label}</span>
                <span className="shade-hex">{tile.hex}</span>
                {copiedHex === tile.hex && <span className="shade-feedback">Copied</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
