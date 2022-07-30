import styled from "styled-components";
import {
  Box as MuiBox,
  Slider as MuiSlider,
  Checkbox as MuiCheckbox,
  Button as MuiButton,
  Snackbar as MuiSnackbar,
} from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 500px;
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

export const Label = styled.span`
  font-family: "JetBrains Mono", sans-serif;
  font-size: 16px;
  color: #ffffff;
`;

export const Options = styled.div`
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

export const Button = styled(MuiButton).attrs({
  color: "primary",
})`
  && {
    text-transform: none;
    width: 120px;
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
