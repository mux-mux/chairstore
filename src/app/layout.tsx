import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import StoreProvider from '@/lib/redux/StoreProvider';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chair Store - Premium Chairs',
  description: 'Browse and buy premium chairs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
