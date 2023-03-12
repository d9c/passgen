'use client';

import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { MuiTheme } from '@/styles/mui';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={MuiTheme}>{children}</ThemeProvider>;
}
