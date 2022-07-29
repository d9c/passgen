import styled from "styled-components";
import {
  Slider as MuiSlider,
  Button as MuiButton,
  Checkbox as MuiCheckBox,
  Snackbar as MuiSnackbar,
} from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 500px;
`;

export const Password = styled.input`
  text-align: center;
  font-family: "JetBrains Mono";
  font-size: 16px;
  color: #ffffff;

  background-color: #606164;
  border: none;
  border-radius: 5px;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  width: 80%;
  height: 40px;

  cursor: pointer;

  &:hover {
    border: 2px solid white;
    transition: 100ms ease-in-out;
  }

  &:focus {
    outline: none;
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
    font-family: "JetBrains Mono";
    color: #ffffff;
  }
`;

export const Slider = styled(MuiSlider)`
  && {
    width: 150px;
  }
`;

export const Checkbox = styled(MuiCheckBox)`
  && {
    color: #ffffff;

    &.Mui-checked {
      color: #ffffff;
    }
  }
`;

export const Button = styled(MuiButton)`
  && {
    background-color: #606164;

    text-transform: none;
    font-family: "JetBrains Mono";
    color: #ffffff;

    width: 120px;

    &:hover {
      background-color: #606164;
      filter: brightness(90%);
      transition: 100ms ease-in-out;
    }
  }
`;

export const Snackbar = styled(MuiSnackbar)`
  && {
    .MuiSnackbarContent-message {
      font-family: "JetBrains Mono";
    }
  }
`;
