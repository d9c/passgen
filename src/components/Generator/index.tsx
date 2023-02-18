import React, { useState, useRef, useEffect } from 'react';

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
  const [open, setOpen] = useState<boolean>(false);

  const pwdRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    generatePassword();
  }, [settings]);

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

    if (pwdRef.current) {
      pwdRef.current.innerText = password;
    }
  };

  const handleSliderChange = (e: Event, newValue: number | number[]) => {
    if (newValue !== settings.length) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        length: newValue as number,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    const checkCount = Object.values(settings).filter((option) => {
      return typeof option === 'boolean' && option === true;
    }).length;

    if (!checked && checkCount === 1) return;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const copyToClipboard = () => {
    if (pwdRef.current) {
      navigator.clipboard.writeText(pwdRef.current.innerText);
      setOpen(true);
    }
  };

  return (
    <S.Container>
      <S.Password>
        <S.Label ref={pwdRef} />
        <S.ButtonsContainer>
          <S.MuiTooltip title="Copy to Clipboard" placement="top">
            <S.IconButton onClick={copyToClipboard}>
              <ContentCopy color="primary" />
            </S.IconButton>
          </S.MuiTooltip>
          <S.MuiTooltip title="New Password" placement="top">
            <S.IconButton onClick={generatePassword}>
              <Cached color="primary" />
            </S.IconButton>
          </S.MuiTooltip>
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
            value={settings.length}
            onChange={handleSliderChange}
          />
        </S.Option>
        <S.Option>
          <S.Label>Uppercase</S.Label>
          <S.MuiCheckbox
            name="uppercase"
            checked={settings.uppercase}
            onChange={handleCheckboxChange}
          />
        </S.Option>
        <S.Option>
          <S.Label>Lowercase</S.Label>
          <S.MuiCheckbox
            name="lowercase"
            checked={settings.lowercase}
            onChange={handleCheckboxChange}
          />
        </S.Option>
        <S.Option>
          <S.Label>Numbers</S.Label>
          <S.MuiCheckbox
            name="numbers"
            checked={settings.numbers}
            onChange={handleCheckboxChange}
          />
        </S.Option>
        <S.Option>
          <S.Label>Symbols</S.Label>
          <S.MuiCheckbox
            name="symbols"
            checked={settings.symbols}
            onChange={handleCheckboxChange}
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
