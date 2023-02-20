import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';

import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 640px;
`;

export const Password = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111111;
  border: 1px solid #333333;
  border-radius: 4px;
  width: 100%;
  padding: 6px 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.span`
  font-family: 'JetBrains Mono', sans-serif;
  font-size: 16px;
  color: #ffffff;
`;

export const MuiSlider = styled(Slider).attrs({
  color: 'primary',
})`
  && {
    width: 200px;

    .MuiSlider-valueLabel {
      background-color: #ffffff;
      font-family: 'JetBrains Mono', sans-serif;
      color: #000000;
    }
  }
`;

export const MuiCheckbox = styled(Checkbox).attrs({
  color: 'primary',
})`
  && {
    color: #ffffff;
  }
`;

export const MuiSnackbar = styled(Snackbar)`
  && {
    .MuiPaper-root {
      background-color: #ffffff;
    }

    .MuiSnackbarContent-message {
      font-family: 'JetBrains Mono', sans-serif;
      color: #000000;
    }
  }
`;

export const MuiTooltip = muiStyled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    fontFamily: 'JetBrains Mono, sans-serif',
    fontSize: '12px',
    color: '#000000',
  },
});
