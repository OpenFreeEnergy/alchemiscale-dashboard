/**
 * Centralized localStorage operations for authentication and app state
 */

const KEYS = {
  TOKEN: 'alchemiscale_token',
  USERNAME: 'alchemiscale_username',
} as const;

export interface AuthData {
  token: string;
  username: string;
}

/**
 * Store authentication token
 */
export function setAuthToken(token: string): void {
  localStorage.setItem(KEYS.TOKEN, token);
}

/**
 * Get authentication token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(KEYS.TOKEN);
}

/**
 * Store username/identity
 */
export function setUsername(username: string): void {
  localStorage.setItem(KEYS.USERNAME, username);
}

/**
 * Get username/identity
 */
export function getUsername(): string | null {
  return localStorage.getItem(KEYS.USERNAME);
}

/**
 * Store complete auth data
 */
export function setAuthData(data: AuthData): void {
  setAuthToken(data.token);
  setUsername(data.username);
}

/**
 * Get complete auth data
 */
export function getAuthData(): AuthData | null {
  const token = getAuthToken();
  const username = getUsername();

  if (!token) {
    return null;
  }

  return {
    token,
    username: username || '',
  };
}

/**
 * Clear all authentication data
 */
export function clearAuthData(): void {
  localStorage.removeItem(KEYS.TOKEN);
  localStorage.removeItem(KEYS.USERNAME);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
