import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

// Define your custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Purple
    },
    secondary: {
      main: '#ffeb3b', // Yellow
    },
    background: {
      default: '#333', // Dark Grey
    },
  },
  // Add more theme configurations if needed
});

const MainThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      {children}
    </ThemeProvider>
  );
};

export default MainThemeProvider;