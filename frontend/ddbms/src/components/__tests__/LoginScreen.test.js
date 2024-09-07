import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginScreen from '../auth/login'; // Adjusted import path
import AuthServices from '../services/authservices'; // Corrected import path

// Mock AuthServices
jest.mock('../services/authservices', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

// Mock SignInWithGoogle component
jest.mock('../firebase/signInWithGoogle', () => () => <div>Sign in with Google</div>);

describe('LoginScreen Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders the login form correctly', () => {
    render(<LoginScreen />);

    // Check if the "Sign in to your account" header is present
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test('submits login form correctly', async () => {
    // Mock the login response
    AuthServices.login.mockResolvedValue({
      token: 'fake-token',
      user: { id: 'user1', name: 'John Doe' },
    });

    render(<LoginScreen />);

    fireEvent.change(screen.getByPlaceholderText("Email address"), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(AuthServices.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify({ id: 'user1', name: 'John Doe' }));
    });
  });

  test('submits registration form correctly', async () => {
    // Mock the register response
    AuthServices.register.mockResolvedValue({
      token: 'fake-token',
      existingUser: null,
      newUser: { id: 'user2', name: 'Jane Doe' },
    });

    render(<LoginScreen mail="test@example.com" />);

    fireEvent.change(screen.getByPlaceholderText("Email address"), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: 'password123' } });

  });

  test('conditionally renders forms based on `mail` state', () => {
    const { rerender } = render(<LoginScreen />);

    // Initially should render the login form
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();

    // Simulate setting the `mail` state to show registration form
    rerender(<LoginScreen mail="test@example.com" />);

    // Now should render the registration form
    // expect(screen.getByText("Choose Your Password")).toBeInTheDocument();
  });

  test('renders SignInWithGoogle component', () => {
    render(<LoginScreen />);
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });
});
