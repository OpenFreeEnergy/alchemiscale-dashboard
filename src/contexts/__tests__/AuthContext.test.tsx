import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/lib/storage', () => ({
  getAuthData: vi.fn(() => null),
  setAuthData: vi.fn(),
  clearAuthData: vi.fn(),
}));

vi.mock('@/lib/alchemiscale-client', () => ({
  configureAlchemiscaleClient: vi.fn(),
  setAuthToken: vi.fn(),
  clearAuthToken: vi.fn(),
}));

import * as storage from '@/lib/storage';
import * as client from '@/lib/alchemiscale-client';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Build a minimal JWT with a given `exp` (seconds since epoch). */
function makeJwt(exp: number): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: 'user', exp }));
  const sig = 'signature';
  return `${header}.${payload}.${sig}`;
}

/** A component that renders auth context values for assertions. */
function AuthConsumer() {
  const { authData, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="username">{authData?.username ?? ''}</span>
      <button data-testid="login" onClick={() => login('tok', 'alice')}>login</button>
      <button data-testid="logout" onClick={() => logout()}>logout</button>
    </div>
  );
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    // Default: no stored auth
    vi.mocked(storage.getAuthData).mockReturnValue(null);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('renders children and provides context values', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('authenticated').textContent).toBe('false');
    expect(screen.getByTestId('username').textContent).toBe('');
  });

  it('login() sets token in localStorage and OpenAPI.TOKEN', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );

    act(() => {
      screen.getByTestId('login').click();
    });

    expect(storage.setAuthData).toHaveBeenCalledWith({ token: 'tok', username: 'alice' });
    expect(client.setAuthToken).toHaveBeenCalledWith('tok');
    expect(screen.getByTestId('authenticated').textContent).toBe('true');
    expect(screen.getByTestId('username').textContent).toBe('alice');
  });

  it('logout() clears token from localStorage and OpenAPI.TOKEN', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );

    // First login, then logout
    act(() => {
      screen.getByTestId('login').click();
    });
    act(() => {
      screen.getByTestId('logout').click();
    });

    expect(storage.clearAuthData).toHaveBeenCalled();
    expect(client.clearAuthToken).toHaveBeenCalled();
    expect(screen.getByTestId('authenticated').textContent).toBe('false');
  });

  it('expired token in localStorage is cleared on mount', () => {
    const expiredToken = makeJwt(Math.floor(Date.now() / 1000) - 60); // expired 60s ago
    vi.mocked(storage.getAuthData).mockReturnValue({
      token: expiredToken,
      username: 'bob',
    });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );

    // Should NOT restore auth — token is expired
    expect(screen.getByTestId('authenticated').textContent).toBe('false');
    expect(client.clearAuthToken).toHaveBeenCalled();
    expect(storage.clearAuthData).toHaveBeenCalled();
  });

  it('valid (non-expired) token IS restored on mount', () => {
    const validToken = makeJwt(Math.floor(Date.now() / 1000) + 3600); // expires in 1h
    vi.mocked(storage.getAuthData).mockReturnValue({
      token: validToken,
      username: 'carol',
    });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('authenticated').textContent).toBe('true');
    expect(screen.getByTestId('username').textContent).toBe('carol');
    expect(client.setAuthToken).toHaveBeenCalledWith(validToken);
  });
});
