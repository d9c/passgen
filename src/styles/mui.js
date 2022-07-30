import { createTheme } from "@mui/material/styles";

export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#697dff",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["JetBrains Mono", "sans-serif"].join(","),
  },
});
