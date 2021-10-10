import { createTheme } from "@material-ui/core";

//definição do tema, alterar aqui mudara em todo o sistema
const theme = createTheme({
  palette: {
    primary: {
      light: "#f3b789",
      main: "#E2711D",
      dark: "#ad4d03",
    },
    secondary: {
      light: "#2bfff2",
      main: "#2D3142",
      dark: "#1dd6cb",
    },
    text: {
      primary: "#707070",
      secondary: "#9B9B9B",
      disabled: "#D3D3D3",
    },
    error: {
      main: "#f51d1d",
    },
    warning: {
      main: "#FCA600",
    },
    success: {
      main: "#00D34D",
    },
    background: {},
    grey: {
      50: "#FAFAFA",
      100: "#F0F0F0",
      200: "#D7D9DD",
      300: "#C4C4C4",
      400: "#9B9B9B",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  shape: {
    borderRadius: "3px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            color: "white",
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 39px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

export default theme;
