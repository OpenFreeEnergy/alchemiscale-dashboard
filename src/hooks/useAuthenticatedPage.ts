import { useState, useEffect } from 'react';
import { configureAlchemiscaleClient, setAuthToken as setClientAuthToken } from '@/lib/alchemiscale-client';
import { useAuthData } from './useAuthData';

export function useAuthenticatedPage() {
  const { authData, isLoading } = useAuthData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configure the client on mount
  useEffect(() => {
    configureAlchemiscaleClient();
  }, []);

  // Set authentication state when authData is loaded
  useEffect(() => {
    if (!isLoading && authData) {
      setClientAuthToken(authData.token);
      setIsAuthenticated(true);
    } else if (!isLoading) {
      setIsAuthenticated(false);
    }
  }, [authData, isLoading]);

  return { isAuthenticated, authChecked: !isLoading };
}