import '@/styles/tailwind.css';

import { JetBrains_Mono } from 'next/font/google';

import Providers from './providers';

const font = JetBrains_Mono({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'PassGen',
  icons: {
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers font={font.className.replace('className', 'JetBrains_Mono')}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
