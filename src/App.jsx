import React from "react";

import * as S from "./App.styles";

import { Generator } from "./components/Generator";

import { GlobalStyle } from "./styles/global";

export const App = () => {
  return (
    <S.Container>
      <Generator />
      <GlobalStyle />
    </S.Container>
  );
};
