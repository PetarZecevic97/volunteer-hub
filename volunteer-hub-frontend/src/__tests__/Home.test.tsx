import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Home Component', () => {
  it('renders successfully', () => {
    const theme = createTheme();

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>
    );

    const element = screen.getByText(/welcome to volunteerhub/i);

    expect(element).toBeInTheDocument();
  });

  it('displays the "Get Started" button', () => {
    const theme = createTheme();

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>
    );

    const button = screen.getByText('Get Started');

    expect(button).toBeInTheDocument();
  });

  it('navigates to the "Sign In" page when "Get Started" button is clicked', () => {
    const theme = createTheme();
    const navigate = jest.fn(); // Mock navigate function
    (useNavigate as jest.Mock).mockReturnValue(navigate); // Mock useNavigate function

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>
    );

    const button = screen.getByText('Get Started');

    fireEvent.click(button);

    // Ensure that navigate was called with the expected path
    expect(navigate).toHaveBeenCalledWith('/sign-in', { replace: true });
  });

  // Add more test cases as needed

});
