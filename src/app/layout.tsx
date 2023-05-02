import '@/styles/tailwind.css';

import Providers from './providers';

export const metadata = {
  title: 'PassGen',
  icons: {
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#000] font-['Jetbrains_Mono'] ">
        <Providers>
          <div className="flex h-screen items-center justify-center">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
