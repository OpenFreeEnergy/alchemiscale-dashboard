/**
 * Auth error handling utilities
 *
 * Provides helpers for detecting and handling authentication errors (401)
 * throughout the application.
 */

import { ApiError } from '@/client/core/ApiError';
import * as storage from '@/lib/storage';
import { clearAuthToken } from '@/lib/alchemiscale-client';

export interface AuthErrorResult {
  isAuthError: boolean;
  message: string;
  shouldClearAuth: boolean;
}

/**
 * Check if an error is a 401 Unauthorized error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.status === 401;
  }
  return false;
}

/**
 * Handle authentication errors consistently across the application
 * Returns information about the error and whether auth should be cleared
 */
export function handleAuthError(error: unknown): AuthErrorResult {
  if (isAuthError(error)) {
    // Clear auth state when we detect a 401
    clearAuthToken();
    storage.clearAuthData();

    return {
      isAuthError: true,
      message: 'Your session has expired. Please log in again to continue.',
      shouldClearAuth: true,
    };
  }

  // Not an auth error - return the original error message
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  return {
    isAuthError: false,
    message,
    shouldClearAuth: false,
  };
}

/**
 * Wrapper for API calls that handles auth errors automatically
 * Usage:
 *   const data = await withAuthErrorHandling(
 *     () => DefaultService.someApiCall(),
 *     (error) => setError(error.message),
 *     (shouldClear) => { if (shouldClear) setIsAuthenticated(false); }
 *   );
 */
export async function withAuthErrorHandling<T>(
  apiCall: () => Promise<T>,
  onError: (error: AuthErrorResult) => void,
  onAuthCleared?: (cleared: boolean) => void
): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error) {
    const authError = handleAuthError(error);
    onError(authError);

    if (authError.shouldClearAuth && onAuthCleared) {
      onAuthCleared(true);
    }

    return null;
  }
}