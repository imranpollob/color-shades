import './globals.css';

export const metadata = {
  title: 'Color Shade Generator',
  description:
    'Generate lighter and darker shades for any hex color, copy them instantly, or export the palette as an image.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
