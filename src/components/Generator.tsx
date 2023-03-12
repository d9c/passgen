'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Snackbar from '@mui/material/Snackbar';
import Slider from '@mui/material/Slider';

import ContentCopy from '@mui/icons-material/ContentCopy';
import Cached from '@mui/icons-material/Cached';

import { Checkbox } from './mui/Checkbox';

// move all mui components to its own component and use `styled`

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
    if (settings.symbols) characters += '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

    let password = '';
    for (let i = 0; password.length < settings.length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      const isRepeat = characters[index] === password[password.length - 1];
      if (!isRepeat) {
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
          <Tooltip
            title="Copy to Clipboard"
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: '#FFF',
                  fontFamily: 'JetBrains Mono, sans-serif',
                  fontSize: '12px',
                  color: '#000',
                },
              },
            }}
          >
            <IconButton onClick={copyToClipboard}>
              <ContentCopy color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="New Password"
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: '#FFF',
                  fontFamily: 'JetBrains Mono, sans-serif',
                  fontSize: '12px',
                  color: '#000',
                },
              },
            }}
          >
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
            sx={{
              width: '200px',
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#FFF',
                fontFamily: 'JetBrains Mono',
                color: '#000',
              },
            }}
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
        ContentProps={{
          sx: {
            backgroundColor: '#FFF',
            fontFamily: 'JetBrains Mono',
            fontSize: '14px',
            color: '#000',
          },
        }}
      />
    </div>
  );
};
