import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const generateTheme = () => {
  let theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          root: { borderRadius: "8px" },
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  // theme.components.MuiAutocomplete.styleOverrides.root.borderRadius = "8px";
  console.log(("devlog", theme));
  return theme;
};
