import { styled } from '@mui/material/styles';

import {
  Slider as MuiSlider,
  Checkbox as MuiCheckbox,
  Snackbar as MuiSnackbar,
  Tooltip as MuiTooltip,
} from '@mui/material';

import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const Slider = styled(MuiSlider)({
  width: '200px',
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#FFF',
    fontFamily: 'JetBrains Mono',
    color: '#000',
  },
});

export const Checkbox = styled(MuiCheckbox)({
  '&.MuiButtonBase-root': {
    color: '#FFF',
  },
});

export const Snackbar = styled(MuiSnackbar)({
  '& .MuiPaper-root': {
    backgroundColor: '#FFF',
    fontFamily: 'JetBrains Mono',
    fontSize: '14px',
    color: '#000',
  },
});

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#FFF',
    fontFamily: 'JetBrains Mono, sans-serif',
    fontSize: '12px',
    color: '#000',
  },
});
