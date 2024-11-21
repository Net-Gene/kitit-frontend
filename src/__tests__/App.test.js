// App.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Kääri sovellus MemoryRouterilla simuloidaksesi reititystä
import App from '../App';
import { act } from 'react';  // Import act from 'react'

test('renders learn react link on home page', () => {
  render(<App />);  // Remove MemoryRouter
});

