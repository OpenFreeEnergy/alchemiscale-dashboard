import { useState, useEffect } from 'react';
import * as storage from '@/lib/storage';
import type { AuthData } from '@/lib/storage';

/**
 * Safe hook to access auth data from localStorage
 * Handles SSR by only accessing localStorage on the client side
 */
export function useAuthData() {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only access localStorage on client side
    const data = storage.getAuthData();
    setAuthData(data);
    setIsLoading(false);
  }, []);

  return { authData, isLoading };
}