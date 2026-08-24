import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { AppStateProvider } from './context/AppStateProvider';

describe('authentication routes', () => {
  it('renders the login page at /login', () => {
    render(
      <AppStateProvider>
        <MemoryRouter initialEntries={['/login']}>
          <AppRoutes />
        </MemoryRouter>
      </AppStateProvider>
    );

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders the signup page at /signup', () => {
    render(
      <AppStateProvider>
        <MemoryRouter initialEntries={['/signup']}>
          <AppRoutes />
        </MemoryRouter>
      </AppStateProvider>
    );

    expect(screen.getByRole('heading', { name: /create your donor account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
});
