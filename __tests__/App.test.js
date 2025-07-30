import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

// Mock the navigation container
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}) => children,
}));

// Mock the context providers
jest.mock('../src/context/AuthContext', () => ({
  AuthProvider: ({children}) => children,
}));

jest.mock('../src/context/EnergyContext', () => ({
  EnergyProvider: ({children}) => children,
}));

describe('App', () => {
  it('renders without crashing', () => {
    const {getByTestId} = render(<App />);
    expect(getByTestId).toBeDefined();
  });
}); 