import '@/styles/tailwind.css';

import Providers from './providers';

export const metadata = {
  title: 'Password Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 box-border bg-[#000] p-0 font-['Jetbrains_Mono']">
        <Providers>
          <div className="flex h-screen items-center justify-center">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
