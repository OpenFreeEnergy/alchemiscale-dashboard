import { useState } from 'react';
import * as storage from '@/lib/storage';
import type { AuthData } from '@/lib/storage';

/**
 * Safe hook to access auth data from localStorage
 * Handles SSR by only accessing localStorage on the client side
 */
export function useAuthData() {
  const [authData] = useState<AuthData | null>(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return null;
    return storage.getAuthData();
  });
  const [isLoading] = useState(false);

  return { authData, isLoading };
}