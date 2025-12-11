import { useEffect } from 'react';
import { configureAlchemiscaleClient, setAuthToken as setClientAuthToken } from '@/lib/alchemiscale-client';
import { useAuthData } from './useAuthData';

export function useAuthenticatedPage() {
  const { authData, isLoading } = useAuthData();

  // Configure the client on mount
  useEffect(() => {
    configureAlchemiscaleClient();
  }, []);

  // Set auth token when authData is available
  useEffect(() => {
    if (!isLoading && authData) {
      setClientAuthToken(authData.token);
    }
  }, [authData, isLoading]);

  // Compute authentication state as derived value
  const isAuthenticated = !isLoading && !!authData;

  return { isAuthenticated, authChecked: !isLoading };
}