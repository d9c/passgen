import { styled } from '@mui/material/styles';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const MuiTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    fontFamily: 'JetBrains Mono, sans-serif',
    fontSize: '12px',
    color: '#000000',
  },
});
