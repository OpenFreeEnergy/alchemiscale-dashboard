import { useState, useEffect, useRef, useCallback } from 'react';
import { isAuthError } from '@/lib/auth-errors';
import { useAuth } from '@/contexts/AuthContext';

interface UseApiDataOptions<T> {
  fetchFn: () => Promise<T>;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

export function useApiData<T>({
  fetchFn,
  enabled = true,
  onSuccess,
  onError,
}: UseApiDataOptions<T>): UseApiDataReturn<T> {
  const { logout } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const hasFetchedRef = useRef(false);

  // Store the latest callbacks in refs to avoid dependency issues
  const fetchFnRef = useRef(fetchFn);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const logoutRef = useRef(logout);

  // Update refs when callbacks change
  useEffect(() => {
    fetchFnRef.current = fetchFn;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    logoutRef.current = logout;
  });

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError('');

    try {
      const result = await fetchFnRef.current();
      setData(result);
      onSuccessRef.current?.(result);
      hasFetchedRef.current = true;
    } catch (err) {
      // Detect 401 errors and trigger logout via the auth context
      if (isAuthError(err)) {
        logoutRef.current();
        setError('Your session has expired. Please log in again to continue.');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
      }
      onErrorRef.current?.(err instanceof Error ? err : new Error(String(err)));
      console.error('API error:', err);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    // Only fetch once when enabled becomes true
    if (enabled && !hasFetchedRef.current) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
