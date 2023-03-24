'use client';

import { useState, useRef, useCallback, useEffect, ChangeEvent } from 'react';

import IconButton from '@mui/material/IconButton';

import ContentCopy from '@mui/icons-material/ContentCopy';
import Cached from '@mui/icons-material/Cached';

import { Checkbox, Snackbar, Slider, Tooltip } from '@/components/MuiStyled';

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

export default function Home() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [open, setOpen] = useState<boolean>(false);

  const pwdRef = useRef<HTMLSpanElement>(null);

  const generatePassword = useCallback(() => {
    let characters = '';
    if (settings.uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (settings.lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (settings.numbers) characters += '0123456789';
    if (settings.symbols) characters += '~!@#$%^&*()_+`-={}[]|\\:;"<>,.?/';

    const randomValues = new Uint32Array(settings.length);
    window.crypto.getRandomValues(randomValues);

    const password = Array.from(randomValues, (value) => {
      return characters.charAt(value % characters.length);
    }).join('');

    if (pwdRef.current) {
      pwdRef.current.innerText = password;
    }
  }, [settings]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleSliderChange = (e: Event, newValue: number | number[]) => {
    if (newValue !== settings.length) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        length: newValue as number,
      }));
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex w-[640px] flex-col items-center gap-[20px]">
      <div className="flex w-full items-center justify-between rounded-[4px] border-[1px] border-solid border-[#333] bg-[#111] px-[16px] py-[6px]">
        <span className="text-[16px] text-[#FFF]" ref={pwdRef} />
        <div className="flex items-center gap-[5px]">
          <Tooltip title="Copy to Clipboard" placement="top">
            <IconButton onClick={copyToClipboard}>
              <ContentCopy color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="New Password" placement="top">
            <IconButton onClick={generatePassword}>
              <Cached color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[10px]">
        <div className="flex items-center justify-between">
          <span className="text-[16px] text-[#FFF]">Length</span>
          <Slider
            min={1}
            max={50}
            size="small"
            valueLabelDisplay="auto"
            value={settings.length}
            onChange={handleSliderChange}
          />
        </div>
        <div className="content-bet flex items-center justify-between">
          <span className="text-[16px] text-[#FFF]">Uppercase</span>
          <Checkbox
            name="uppercase"
            checked={settings.uppercase}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="content-bet flex items-center justify-between">
          <span className="text-[16px] text-[#FFF]">Lowercase</span>
          <Checkbox
            color="primary"
            name="lowercase"
            checked={settings.lowercase}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="content-bet flex items-center justify-between">
          <span className="text-[16px] text-[#FFF]">Numbers</span>
          <Checkbox
            name="numbers"
            checked={settings.numbers}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="content-bet flex items-center justify-between">
          <span className="text-[16px] text-[#FFF]">Symbols</span>
          <Checkbox
            name="symbols"
            checked={settings.symbols}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="Copied to clipboard"
      />
    </div>
  );
}
