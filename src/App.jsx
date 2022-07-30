import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import * as S from "./App.styles";

import { Generator } from "./components/Generator";

import { MuiTheme } from "./styles/mui";
import { GlobalStyle } from "./styles/global";

export const App = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <S.Container>
        <Generator />
        <GlobalStyle />
      </S.Container>
    </ThemeProvider>
  );
};
