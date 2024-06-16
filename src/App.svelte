<script>
  import { onMount } from "svelte";
  import jscolor from "@eastdesire/jscolor";
  import { saveSvgAsPng } from "save-svg-as-png";

  let color = "#A41A09";
  let svgElement;

  onMount(() => {
    jscolor.install();
  });

  function download() {
    saveSvgAsPng(svgElement, "diagram.png");
  }
</script>

<main>
  <h1>Color Shade Generator</h1>
  <p>Pick a color to generate its shades automatically.</p>

  <div id="output">
    <svg width="250" height="150" bind:this={svgElement}>
      <rect x="0" y="0" width="50" height="150" style="fill:{color};fill-opacity:1;" />
      <rect x="50" y="0" width="50" height="150" style="fill:{color};fill-opacity:0.75;" />
      <rect x="100" y="0" width="50" height="150" style="fill:{color};fill-opacity:0.5;" />
      <rect x="150" y="0" width="50" height="150" style="fill:{color};fill-opacity:0.25;" />
      <rect x="200" y="0" width="50" height="150" style="fill:{color};fill-opacity:0.1;" />
    </svg>
  </div>

  <div id="controls">
    <input class="jscolor" bind:value={color} id="hex" placeholder="HEX code" />
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
</style>
