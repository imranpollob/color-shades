<script>
  import { onMount } from "svelte";
  import jscolor from "@eastdesire/jscolor";
  import { saveSvgAsPng } from "save-svg-as-png";

  let color = "#1C902F";
  let svgElement;
  let shades = [];

  onMount(() => {
    jscolor.install();
    generateShades();
  });

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
  }

  function rgbToHex(r, g, b) {
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  }

  function generateLighterShades(hex, steps) {
    const [r, g, b] = hexToRgb(hex);
    const shades = [];
    for (let i = 0; i <= steps - 1; i++) {
      const factor = i / steps;
      const newR = Math.round(r + (255 - r) * factor);
      const newG = Math.round(g + (255 - g) * factor);
      const newB = Math.round(b + (255 - b) * factor);
      shades.push(rgbToHex(newR, newG, newB));
    }
    return shades;
  }

  function generateShades() {
    shades = generateLighterShades(color, 10); // Generate 10 shades including the original color
  }

  function download() {
    saveSvgAsPng(svgElement, "color-shades.png");
  }
</script>

<main>
  <h1>Color Shade Generator</h1>
  <p>Pick a color to generate its shades automatically.</p>

  <div id="output">
    <svg width="500" height="200" bind:this={svgElement}>
      {#each shades as shade, index}
        <rect
          x={(index % 5) * 100}
          y={index < 5 ? 0 : 100}
          width="100"
          height="100"
          style="fill:{shade};"
        />
        <text
          x={(index % 5) * 100 + 22}
          y={index < 5 ? 55 : 152}
          fill="#000"
          font-size="12"
          font-family="Arial"
          font-weight="700">{shade}</text
        >
      {/each}
    </svg>
  </div>

  <div id="controls">
    <input
      class="jscolor"
      bind:value={color}
      id="hex"
      placeholder="HEX code"
      on:change={generateShades}
    />
    <button on:click={download}>Download</button>
  </div>
</main>

<style>
  main {
    text-align: center;
  }

  h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2em;
    margin-bottom: 20px;
  }

  #output {
    padding-top: 20px;
    margin-bottom: 20px;
  }

  #controls {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .jscolor {
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
  }

  svg text {
    dominant-baseline: middle;
    text-anchor: start;
  }
</style>
