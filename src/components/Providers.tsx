'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

/**
 * Client-side providers wrapper.
 * Keeps the root layout as a server component while providing
 * client-side context (auth state) to the entire app.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
