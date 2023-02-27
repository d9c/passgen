'use client';

import ThemeProvider from '@mui/material/styles/ThemeProvider';

import StyledComponentsRegistry from '@/lib/registry';

import { MuiTheme } from '@/styles/mui';
import { GlobalStyle } from '@/styles/global';

import * as S from './layout.styles';

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
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={MuiTheme}>
            <S.Wrapper>{children}</S.Wrapper>
          </ThemeProvider>
          <GlobalStyle />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
