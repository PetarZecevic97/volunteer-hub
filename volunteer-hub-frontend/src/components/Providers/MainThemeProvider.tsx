import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define your custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#8c1aff', // Light Purple
    },
    secondary: {
      main: '#FFC107', // Amber
    },
    background: {
      default: '#212121', // Dark Background
    },
    text: {
      primary: '#FFFFFF', // White Font Color
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover $notchedOutline': {
            borderColor: '#FFFFFF', // White Border Color on Hover
          },
        },
        notchedOutline: {
          borderColor: '#FFFFFF', // White Border Color
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White Font Color for Labels
        },
      },
    },
  },
});

const MainThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      {children}
    </ThemeProvider>
  );
};

export default MainThemeProvider;