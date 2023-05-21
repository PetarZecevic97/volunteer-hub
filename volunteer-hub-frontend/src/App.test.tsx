import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import configureStore from "./store";

test('renders basic landing page', () => {
  render(
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
  
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
