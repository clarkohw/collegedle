import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const generateTheme = () => {
  let theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            borderRadius: "8px",
            boxShadow: "none",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            backgroundColor: "#f6f4f4",
            border: "none",
          },
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
