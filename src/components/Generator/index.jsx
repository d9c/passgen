import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Cached as RefreshIcon,
} from "@mui/icons-material";

import * as S from "./styles";

export const Generator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [characters, setCharacters] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [passwordLength, characters]);

  useEffect(() => {
    const upperCase = useUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const lowerCase = useLowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
    const numbers = useNumbers ? "1234567890" : "";
    const symbols = useSymbols ? "!@#$%^&*~()[]{}" : "";
    setCharacters(`${upperCase}${lowerCase}${numbers}${symbols}`);
  }, [useUppercase, useLowercase, useNumbers, useSymbols]);

  const generatePassword = () => {
    if (characters) {
      let pwd = "";
      for (let i = 0; pwd.length < passwordLength; i++) {
        const index = Math.floor(Math.random() * characters.length);
        if (characters[index] !== pwd[pwd.length - 1]) pwd += characters[index];
      }
      setPassword(pwd);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setOpen(true);
  };

  return (
    <S.Container>
      <S.Password>
        <S.Label>{password}</S.Label>
        <S.ButtonsContainer>
          <IconButton onClick={copyToClipboard}>
            <CopyIcon color="secondary" />
          </IconButton>
          <S.IconButton
            onClick={generatePassword}
            $enabled={characters ? true : false}
          >
            <RefreshIcon color="secondary" />
          </S.IconButton>
        </S.ButtonsContainer>
      </S.Password>
      <S.OptionsContainer>
        <S.Option>
          <S.Label>Length</S.Label>
          <S.Slider
            size="small"
            valueLabelDisplay="auto"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            min={1}
            max={50}
          />
        </S.Option>
        <S.Option>
          <S.Label>Uppercase</S.Label>
          <S.Checkbox
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <S.Label>Lowercase</S.Label>
          <S.Checkbox
            checked={useLowercase}
            onChange={(e) => setUseLowercase(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <S.Label>Numbers</S.Label>
          <S.Checkbox
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <S.Label>Symbols</S.Label>
          <S.Checkbox
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />
        </S.Option>
      </S.OptionsContainer>
      <S.Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Copied to clipboard"
      />
    </S.Container>
  );
};
