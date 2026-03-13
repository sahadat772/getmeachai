import { DM_Sans, Syne } from 'next/font/google';
import './globals.css';
import ThemeProvider from './components/ui/ThemeProvider';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata = {
  title: 'Get Me a Chai ☕ — Support Creators You Love',
  description: 'Support your favorite creators with a chai. Simple, fast, and free to start.',
  openGraph: {
    title: 'Get Me a Chai ☕',
    description: 'Support your favorite creators with a chai.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${syne.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
