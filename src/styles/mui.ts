import { createTheme } from '@mui/material/styles';

export const theme = (font: string) => {
  return createTheme({
    palette: {
      primary: {
        main: '#FFF',
      },
    },
    typography: {
      fontFamily: [font, 'sans-serif'].join(','),
    },
  });
};
