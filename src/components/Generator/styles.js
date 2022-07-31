import styled from "styled-components";
import {
  Box as MuiBox,
  IconButton as MuiIconButton,
  Slider as MuiSlider,
  Checkbox as MuiCheckbox,
  Snackbar as MuiSnackbar,
} from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 640px;
`;

export const Password = styled(MuiBox).attrs({
  sx: { boxShadow: 2 },
})`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #697dff;
  border-radius: 4px;

  width: 100%;
  padding: 6px 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const IconButton = styled(MuiIconButton)`
  && {
    pointer-events: ${(props) => (props.$enabled ? "auto" : "none")};
    opacity: ${(props) => (props.$enabled ? "1.0" : "0.5")};
  }
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
  font-family: "JetBrains Mono", sans-serif;
  font-size: 16px;
  color: #ffffff;
`;

export const Slider = styled(MuiSlider).attrs({
  color: "secondary",
})`
  && {
    width: 200px;

    .MuiSlider-valueLabelOpen {
      background-color: #ffffff;
    }

    .MuiSlider-valueLabelLabel {
      color: #000000;
    }
  }
`;

export const Checkbox = styled(MuiCheckbox).attrs({
  color: "secondary",
})`
  && {
    color: #ffffff;
  }
`;

export const Snackbar = styled(MuiSnackbar)`
  && {
    .MuiPaper-root {
      background-color: #ffffff;
    }

    .MuiSnackbarContent-message {
      color: #000000;
    }
  }
`;
