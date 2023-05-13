'use client';

import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { theme } from '@/styles/mui';

export default function Providers({
  font,
  children,
}: {
  font: string;
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme(font)}>{children}</ThemeProvider>;
}
