import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
    //   fontFamily: '"Montserrat", sans-serif',
    // fontWeight: 900,
    },
    palette: {
      primary: {
        light: '#99cbfd',
        main: '#4d97f8',
        dark: '#3746a2',
        contrastText: '#fff',
      },
      secondary: {
        light: '#fffbe8',
        main: '#eec94b',
        dark: '#9e7937',
        contrastText: '#000',
      },
    },
  });