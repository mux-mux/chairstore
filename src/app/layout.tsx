import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import StoreProvider from '@/lib/redux/StoreProvider';
import StyledComponentsRegistry from './registry';
import GlobalStyle from '@/styles/GlobalStyle';

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
        <StoreProvider>
          <StyledComponentsRegistry>
            <GlobalStyle />
            {children}
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
