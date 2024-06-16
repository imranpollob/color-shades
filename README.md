# Color Shade Generator

Generate lighter shades of any color with our Color Shade Generator. Pick a color and automatically get 10 shades, perfect for design and development. Download your custom color palette in seconds.

## Features

- Pick a color using the color picker.
- Automatically generate 10 shades of the selected color.
- Download the generated color shades as a PNG image.
- View the HEX code of each shade within the SVG.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/imranpollob/color-shades
   cd color-shades
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Open the app in your browser (typically at `http://localhost:8080`).
2. Use the color picker to select your desired color.
3. View the automatically generated shades in the SVG.
4. Click the "Download" button to save the color shades as a PNG image.

## Code Overview

### `App.svelte`

This is the main component of the application. It includes the SVG element displaying the color shades, the color picker input, and the download button.

### Color Conversion Functions

- `hexToRgb(hex)`: Converts a HEX color to RGB format.
- `rgbToHex(r, g, b)`: Converts RGB values back to HEX format.
- `generateLighterShades(hex, steps)`: Generates an array of lighter shades, including the original color as the first shade.

### Event Handlers

- `generateShades()`: Uses `generateLighterShades` to compute the shades for the selected color.
- `download()`: Uses `saveSvgAsPng` to save the SVG element as a PNG image.

## Meta Tags

The app includes comprehensive meta tags for SEO and social media sharing:

- Description, Open Graph, and Twitter Card meta tags for better visibility and click-through rates.

## Dependencies

- [Svelte](https://svelte.dev/)
- [@eastdesire/jscolor](https://www.npmjs.com/package/@eastdesire/jscolor)
- [save-svg-as-png](https://www.npmjs.com/package/save-svg-as-png)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by various online color palette generators.
- Special thanks to the contributors of Svelte, jscolor, and save-svg-as-png packages.

## Contributing

Feel free to submit issues and pull requests for any improvements or new features.
