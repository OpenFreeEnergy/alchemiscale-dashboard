/**
 * Alchemiscale API Client Configuration
 */
import { OpenAPI } from '@/client';
import { config as appConfig } from '@/lib/config';

/**
 * Configure the Alchemiscale API client
 * Call this before making any API requests
 */
export function configureAlchemiscaleClient(config?: {
  baseUrl?: string;
  token?: string;
}) {
  // Set the base URL for the API
  // Use provided baseUrl, otherwise fall back to centralized config
  OpenAPI.BASE = config?.baseUrl || appConfig.apiBaseUrl;

  // Set authentication token if provided
  if (config?.token) {
    OpenAPI.TOKEN = config.token;
  }

  // Enable credentials for CORS
  OpenAPI.WITH_CREDENTIALS = true;
}

/**
 * Set the authentication token for subsequent requests
 */
export function setAuthToken(token: string) {
  OpenAPI.TOKEN = token;
}

/**
 * Clear the authentication token
 */
export function clearAuthToken() {
  OpenAPI.TOKEN = undefined;
}
