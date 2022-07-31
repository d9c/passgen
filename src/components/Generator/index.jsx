import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ContentCopy, Cached } from "@mui/icons-material";

import * as S from "./styles";

export const Generator = () => {
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState({
    passwordLength: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
  });
  const [characters, setCharacters] = useState("");
  const [checkCount, setCheckCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [settings.passwordLength, characters]);

  useEffect(() => {
    const upperCase = settings.useUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const lowerCase = settings.useLowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
    const numbers = settings.useNumbers ? "1234567890" : "";
    const symbols = settings.useSymbols ? "!@#$%^&*~()[]{}" : "";
    setCharacters(`${upperCase}${lowerCase}${numbers}${symbols}`);
  }, [
    settings.useUppercase,
    settings.useLowercase,
    settings.useNumbers,
    settings.useSymbols,
  ]);

  useEffect(() => {
    let checkCount = [];
    const values = Object.values(settings);
    values.forEach((value) => {
      if (value === true) checkCount.push(value);
    });
    setCheckCount(checkCount.length);
  }, [checkCount]);

  const generatePassword = () => {
    if (characters) {
      let pwd = "";
      for (let i = 0; pwd.length < settings.passwordLength; i++) {
        const index = Math.floor(Math.random() * characters.length);
        if (characters[index] !== pwd[pwd.length - 1]) pwd += characters[index];
      }
      setPassword(pwd);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));
      setCheckCount((prevTrueCount) => prevTrueCount + 1);
    }

    if (!checked && checkCount > 1) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));
      setCheckCount((prevTrueCount) => prevTrueCount - 1);
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
            <ContentCopy color="secondary" />
          </IconButton>
          <IconButton onClick={generatePassword}>
            <Cached color="secondary" />
          </IconButton>
        </S.ButtonsContainer>
      </S.Password>
      <S.OptionsContainer>
        <S.Option>
          <S.Label>Length</S.Label>
          <S.Slider
            min={1}
            max={50}
            size="small"
            valueLabelDisplay="auto"
            name="passwordLength"
            value={settings.passwordLength}
            onChange={handleChange}
          />
        </S.Option>
        <S.Option>
          <S.Label>Uppercase</S.Label>
          <S.Checkbox
            name="useUppercase"
            checked={settings.useUppercase}
            onChange={handleCheck}
          />
        </S.Option>
        <S.Option>
          <S.Label>Lowercase</S.Label>
          <S.Checkbox
            name="useLowercase"
            checked={settings.useLowercase}
            onChange={handleCheck}
          />
        </S.Option>
        <S.Option>
          <S.Label>Numbers</S.Label>
          <S.Checkbox
            name="useNumbers"
            checked={settings.useNumbers}
            onChange={handleCheck}
          />
        </S.Option>
        <S.Option>
          <S.Label>Symbols</S.Label>
          <S.Checkbox
            name="useSymbols"
            checked={settings.useSymbols}
            onChange={handleCheck}
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
