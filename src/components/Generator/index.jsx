import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ContentCopy, Cached } from "@mui/icons-material";

import * as S from "./styles";

export const Generator = () => {
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [checkCount, setCheckCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [
    settings.length,
    settings.uppercase,
    settings.lowercase,
    settings.numbers,
    settings.symbols,
  ]);

  useEffect(() => {
    const values = Object.values(settings);
    const checkCount = values.filter((value) => value === true);
    setCheckCount(checkCount.length);
  }, [checkCount]);

  const generatePassword = () => {
    let characters = "";
    if (settings.uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (settings.lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (settings.numbers) characters += "1234567890";
    if (settings.symbols) characters += "!@#$%^&*~()[]{}";

    let password = "";
    for (let i = 0; password.length < settings.length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      if (characters[index] !== password[password.length - 1]) {
        password += characters[index];
      }
    }

    setPassword(password);
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleChangeChecked = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));

      setCheckCount((prevCheckCount) => prevCheckCount + 1);
    }

    if (!checked && checkCount > 1) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));

      setCheckCount((prevCheckCount) => prevCheckCount - 1);
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
            name="length"
            value={settings.length}
            onChange={handleChangeValue}
          />
        </S.Option>
        <S.Option>
          <S.Label>Uppercase</S.Label>
          <S.Checkbox
            name="uppercase"
            checked={settings.uppercase}
            onChange={handleChangeChecked}
          />
        </S.Option>
        <S.Option>
          <S.Label>Lowercase</S.Label>
          <S.Checkbox
            name="lowercase"
            checked={settings.lowercase}
            onChange={handleChangeChecked}
          />
        </S.Option>
        <S.Option>
          <S.Label>Numbers</S.Label>
          <S.Checkbox
            name="numbers"
            checked={settings.numbers}
            onChange={handleChangeChecked}
          />
        </S.Option>
        <S.Option>
          <S.Label>Symbols</S.Label>
          <S.Checkbox
            name="symbols"
            checked={settings.symbols}
            onChange={handleChangeChecked}
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
