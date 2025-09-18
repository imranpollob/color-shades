# Color Shade Generator

Generate lighter and darker shades of any color with our Color Shade Generator. Pick a color and automatically get 10 light and 10 dark shades, perfect for design and development. Copy the HEX values you need in a click.

## Features

- Pick a color using the color picker or enter a HEX code.
- Automatically generate 10 lighter and 10 darker shades of the selected color.
- Copy any shade's HEX code with a single click.
- Accessible contrast-aware text colors for every tile.

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

1. Open the app in your browser (typically at `http://localhost:3000`).
2. Use the color picker or HEX input to select your desired color.
3. Explore the lighter and darker shade tiles.
4. Click any tile to copy its HEX value to the clipboard.

## Code Overview

### `app/page.jsx`

This is the main component of the application. It renders the color picker, HEX input, and the lighter/darker shade grids.

### Color Conversion Functions

- `hexToRgb(hex)`: Converts a HEX color to RGB format.
- `rgbToHex(r, g, b)`: Converts RGB values back to HEX format.
- `generateLighterShades(hex, steps)`: Generates an array of lighter shades, including the original color as the first tile.
- `generateDarkerShades(hex, steps)`: Generates an array of darker shades, including the original color as the first tile.

### Event Handlers

- `handleHexInput()`: Validates user input and updates the palette when a valid HEX color is entered.
- `handleColorPicker()`: Updates the palette when a color is selected with the native color picker.
- `copyShade()`: Copies the clicked shade to the clipboard and shows a toast.

## Meta Tags

The app includes comprehensive meta tags for SEO and social media sharing:

- Description, Open Graph, and Twitter Card meta tags for better visibility and click-through rates.

## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by various online color palette generators.
- Special thanks to the React and Next.js communities.

## Contributing

Feel free to submit issues and pull requests for any improvements or new features.
