import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const generateTheme = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return theme;
};
