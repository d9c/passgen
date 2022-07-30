import React, { useState, useEffect } from "react";
import { Checkbox, Snackbar } from "@mui/material";

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
    const symbols = useSymbols ? "!@#$%^&*~()[]{}<>;:,." : "";
    const chars = `${upperCase}${lowerCase}${numbers}${symbols}`;

    let pwd = "";

    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * chars.length);

      if (chars && noRepeat) {
        if (!pwd.includes(chars[index])) {
          pwd += chars[index];
        }
      } else if (chars) {
        pwd += chars[index];
      } else {
        pwd = "";
      }
    }

    setPassword(pwd);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setOpen(true);
    }
  };

  return (
    <S.Container>
      <S.Password type="button" variant="contained" onClick={copyToClipboard}>
        {password}
      </S.Password>
      <S.Options>
        <S.Option>
          <span>Length</span>
          <S.Slider
            size="small"
            valueLabelDisplay="auto"
            min={6}
            max={50}
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </S.Option>
        <S.Option>
          <span>Uppercase letters</span>
          <Checkbox
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
            color="secondary"
          />
        </S.Option>
        <S.Option>
          <span>Lowercase letters</span>
          <Checkbox
            checked={useLowerCase}
            onChange={(e) => setUseLowerCase(e.target.checked)}
            color="secondary"
          />
        </S.Option>
        <S.Option>
          <span>Numbers</span>
          <Checkbox
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
            color="secondary"
          />
        </S.Option>
        <S.Option>
          <span>Symbols</span>
          <Checkbox
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            color="secondary"
          />
        </S.Option>
        <S.Option>
          <span>Do not repeat characters</span>
          <Checkbox
            checked={noRepeat}
            onChange={(e) => setNoRepeat(e.target.checked)}
            color="secondary"
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
