'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import * as storage from '@/lib/storage';
import type { AuthData } from '@/lib/storage';
import {
  configureAlchemiscaleClient,
  setAuthToken as setClientAuthToken,
  clearAuthToken as clearClientAuthToken,
} from '@/lib/alchemiscale-client';

interface AuthContextValue {
  /** Current auth data (token + username), or null if not authenticated */
  authData: AuthData | null;
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;
  /** Log in with a token and username. Sets localStorage, OpenAPI.TOKEN, and schedules expiry. */
  login: (token: string, username: string) => void;
  /** Log out. Clears localStorage, OpenAPI.TOKEN, and cancels any expiry timer. */
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Decode the payload of a JWT and return the parsed JSON.
 * Uses atob — no external library needed.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    // Handle base64url encoding and add padding
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Return the `exp` claim (seconds since epoch) from a JWT, or null if absent/invalid.
 */
function getTokenExpiry(token: string): number | null {
  const payload = decodeJwtPayload(token);
  if (payload && typeof payload.exp === 'number') {
    return payload.exp;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearExpiryTimer = useCallback(() => {
    if (expiryTimerRef.current !== null) {
      clearTimeout(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearExpiryTimer();
    clearClientAuthToken();
    storage.clearAuthData();
    setAuthData(null);
  }, [clearExpiryTimer]);

  /**
   * Schedule a logout slightly before the JWT expires.
   * If the token is already expired, log out immediately.
   */
  const scheduleExpiry = useCallback(
    (token: string) => {
      clearExpiryTimer();
      const exp = getTokenExpiry(token);
      if (exp === null) return; // no exp claim — nothing to schedule

      const nowSec = Math.floor(Date.now() / 1000);
      // Log out 30 seconds before actual expiry so in-flight requests still work.
      const marginSec = 30;
      const remainingSec = exp - nowSec - marginSec;

      if (remainingSec <= 0) {
        // Already expired (or about to expire within the margin)
        logout();
        return;
      }

      expiryTimerRef.current = setTimeout(() => {
        logout();
      }, remainingSec * 1000);
    },
    [clearExpiryTimer, logout],
  );

  const login = useCallback(
    (token: string, username: string) => {
      // Persist to localStorage
      storage.setAuthData({ token, username });
      // Set the in-memory OpenAPI token
      setClientAuthToken(token);
      // Update React state (triggers re-render for all consumers)
      setAuthData({ token, username });
      // Schedule automatic logout before expiry
      scheduleExpiry(token);
    },
    [scheduleExpiry],
  );

  // On mount: configure the API client and restore auth from localStorage.
  useEffect(() => {
    configureAlchemiscaleClient();

    const stored = storage.getAuthData();
    if (stored) {
      // Check if the stored token is already expired
      const exp = getTokenExpiry(stored.token);
      if (exp !== null) {
        const nowSec = Math.floor(Date.now() / 1000);
        if (nowSec >= exp) {
          // Token expired — clear everything
          clearClientAuthToken();
          storage.clearAuthData();
          return;
        }
      }

      // Token is still valid (or has no exp claim) — restore it
      setClientAuthToken(stored.token);
      setAuthData(stored);
      scheduleExpiry(stored.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearExpiryTimer();
  }, [clearExpiryTimer]);

  const value: AuthContextValue = {
    authData,
    isAuthenticated: authData !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Consume the auth context. Must be used inside an `<AuthProvider>`.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
