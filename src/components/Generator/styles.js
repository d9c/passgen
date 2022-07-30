import styled from "styled-components";
import {
  Slider as MuiSlider,
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

export const Password = styled(MuiButton).attrs({
  color: "primary",
})`
  && {
    text-transform: none;
    font-size: 16px;
    width: 100%;
  }
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

  span {
    font-family: "JetBrains Mono", sans-serif;
    font-size: 14px;
    color: #ffffff;
  }
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
