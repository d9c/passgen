import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Cached from '@mui/icons-material/Cached';

import * as S from './styles';

type Settings = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const defaultSettings = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

export const Generator = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [password, setPassword] = useState<string>('');
  const [checkCount, setCheckCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

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
    let characters = '';
    if (settings.uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (settings.lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (settings.numbers) characters += '1234567890';
    if (settings.symbols) characters += '!@#$%^&*~()[]{}';

    let password = '';
    for (let i = 0; password.length < settings.length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      if (characters[index] !== password[password.length - 1]) {
        password += characters[index];
      }
    }

    setPassword(password);
  };

  const handleChangeValue = (e: Event, newValue: number | number[]) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      length: newValue as number,
    }));
  };

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <ContentCopy color="primary" />
          </IconButton>
          <IconButton onClick={generatePassword}>
            <Cached color="primary" />
          </IconButton>
        </S.ButtonsContainer>
      </S.Password>
      <S.OptionsContainer>
        <S.Option>
          <S.Label>Length</S.Label>
          <S.MuiSlider
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
          <S.MuiCheckbox
            name="uppercase"
            checked={settings.uppercase}
            onChange={handleChangeChecked}
          />
        </S.Option>
        <S.Option>
          <S.Label>Lowercase</S.Label>
          <S.MuiCheckbox
            name="lowercase"
            checked={settings.lowercase}
            onChange={handleChangeChecked}
          />
        </S.Option>
        <S.Option>
          <S.Label>Numbers</S.Label>
          <S.MuiCheckbox
            name="numbers"
            checked={settings.numbers}
            onChange={handleChangeChecked}
          />
        </S.Option>
        <S.Option>
          <S.Label>Symbols</S.Label>
          <S.MuiCheckbox
            name="symbols"
            checked={settings.symbols}
            onChange={handleChangeChecked}
          />
        </S.Option>
      </S.OptionsContainer>
      <S.MuiSnackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="Copied to clipboard"
      />
    </S.Container>
  );
};
