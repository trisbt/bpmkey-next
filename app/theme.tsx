'use client'
import { createTheme } from "@mui/material";
import { logoFont, inter, archivo } from "./fonts";



export const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily
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

export const logoTheme = createTheme({
  typography: {
    fontFamily: logoFont.style.fontFamily,
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

export const archivoTheme = createTheme({
  typography: {
    fontFamily: archivo.style.fontFamily,
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