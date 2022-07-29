import React, { useState, useEffect } from "react";

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
      const randomIndex = Math.floor(Math.random() * chars.length);

      if (noRepeat) {
        if (chars && !pwd.includes(chars[randomIndex])) {
          pwd += chars[randomIndex];
        }
      } else if (chars) {
        pwd += chars[randomIndex];
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
      <S.Password onClick={copyToClipboard}>
        <span>{password}</span>
      </S.Password>
      <S.Options>
        <S.Option>
          <span>Length</span>
          <S.Slider
            size="small"
            valueLabelDisplay="auto"
            min={1}
            max={50}
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </S.Option>
        <S.Option>
          <span>Uppercase letters</span>
          <S.Checkbox
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <span>Lowercase letters</span>
          <S.Checkbox
            checked={useLowerCase}
            onChange={(e) => setUseLowerCase(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <span>Numbers</span>
          <S.Checkbox
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <span>Symbols</span>
          <S.Checkbox
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />
        </S.Option>
        <S.Option>
          <span>Do not repeat characters</span>
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
