import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { useApiData } from '../useApiData';

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockLogout = vi.fn();

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ logout: mockLogout }),
}));

// Mock isAuthError: returns true when error has _isAuthError flag
vi.mock('@/lib/auth-errors', () => ({
  isAuthError: (err: unknown) =>
    typeof err === 'object' && err !== null && '_isAuthError' in err && (err as Record<string, unknown>)._isAuthError === true,
}));

// ── Helpers ────────────────────────────────────────────────────────────────

function wrapper({ children }: { children: ReactNode }) {
  // No provider needed — useAuth is fully mocked
  return <>{children}</>;
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('useApiData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls logout on 401 auth errors', async () => {
    const authErr = Object.assign(new Error('Unauthorized'), { _isAuthError: true });
    const fetchFn = vi.fn().mockRejectedValue(authErr);

    const { result } = renderHook(
      () => useApiData({ fetchFn, enabled: true }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(
      'Your session has expired. Please log in again to continue.',
    );
    expect(result.current.data).toBeNull();
  });

  it('surfaces non-auth errors as strings without calling logout', async () => {
    const regularErr = new Error('Network failure');
    const fetchFn = vi.fn().mockRejectedValue(regularErr);

    const { result } = renderHook(
      () => useApiData({ fetchFn, enabled: true }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockLogout).not.toHaveBeenCalled();
    expect(result.current.error).toBe('Network failure');
    expect(result.current.data).toBeNull();
  });
});
