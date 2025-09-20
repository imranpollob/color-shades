import './globals.css';
import '@rc-component/color-picker/assets/index.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const metadata = {
  title: 'Color Shade Generator',
  description:
    'Generate lighter and darker shades for any hex color, copy them instantly, or export the palette as an image.'
};

const primaryFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={primaryFont.className}>{children}</body>
    </html>
  );
}
