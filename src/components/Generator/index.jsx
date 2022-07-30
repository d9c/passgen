import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";

import * as S from "./styles";

export const Generator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [noRepeat, setNoRepeat] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    const upperCase = useUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const lowerCase = useLowerCase ? "abcdefghijklmnopqrstuvwxyz" : "";
    const numbers = useNumbers ? "1234567890" : "";
    const symbols = useSymbols ? "!@#$%^&*~()[]{}" : "";
    const chars = `${upperCase}${lowerCase}${numbers}${symbols}`;

    let pwd = "";

    for (let i = 0; pwd.length < passwordLength; i++) {
      const index = Math.floor(Math.random() * chars.length);

      if (chars && !noRepeat) {
        if (chars[index] !== pwd[pwd.length - 1]) {
          pwd += chars[index];
        }
      }

      if (chars && noRepeat) {
        if (!pwd.includes(chars[index])) {
          pwd += chars[index];
        }
      }

      if (!chars) {
        return;
      }
    }

    setPassword(pwd);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setOpen(true);
  };

  return (
    <S.Container>
      <S.Password>
        <S.Label>{password}</S.Label>
        <IconButton onClick={copyToClipboard}>
          <CopyIcon color="secondary" />
        </IconButton>
      </S.Password>
      <S.Options>
        <S.Option>
          <S.Label>Length</S.Label>
          <S.Slider
            size="small"
            valueLabelDisplay="auto"
            min={1}
            max={40}
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </S.Option>
        <S.Option>
          <S.Label>Uppercase letters</S.Label>
          <S.Checkbox
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <S.Label>Lowercase letters</S.Label>
          <S.Checkbox
            checked={useLowerCase}
            onChange={(e) => setUseLowerCase(e.target.checked)}
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
        <S.Option>
          <S.Label>Do not repeat characters</S.Label>
          <S.Checkbox
            checked={noRepeat}
            onChange={(e) => setNoRepeat(e.target.checked)}
          />
        </S.Option>
      </S.Options>
      <S.Button type="button" variant="contained" onClick={generatePassword}>
        Generate
      </S.Button>
      <S.Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Copied to clipboard"
      />
    </S.Container>
  );
};
