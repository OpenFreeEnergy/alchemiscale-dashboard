'use client';

import { useEffect, useState } from 'react';
import { DefaultService } from '@/client';
import { configureAlchemiscaleClient, setAuthToken as setClientAuthToken } from '@/lib/alchemiscale-client';
import { handleAuthError } from '@/lib/auth-errors';
import { AuthErrorBanner } from '@/components/AuthErrorBanner';
import * as storage from '@/lib/storage';
import Link from 'next/link';

export default function DashboardPage() {
  // Initialize state with default values (no localStorage access during SSR)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);

  // Configure the client and hydrate auth state on mount (client-side only)
  useEffect(() => {
    configureAlchemiscaleClient();

    // Hydrate auth state from localStorage
    const authData = storage.getAuthData();
    if (authData) {
      setClientAuthToken(authData.token);
      setIsAuthenticated(true);
      setUsername(authData.username || '');
    }
  }, []);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAuthError(false);

    try {
      const tokenResponse = await DefaultService.getAccessTokenTokenPost({
        username,
        password,
        grant_type: 'password',
      });

      if (tokenResponse.access_token) {
        setClientAuthToken(tokenResponse.access_token);
        setIsAuthenticated(true);
        // Store auth data for persistence
        storage.setAuthData({
          token: tokenResponse.access_token,
          username: username,
        });
      }
    } catch (err) {
      const authError = handleAuthError(err);
      setError(authError.message);
      setIsAuthError(authError.isAuthError);

      if (authError.shouldClearAuth) {
        setIsAuthenticated(false);
      }

      console.error('Login error:', err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setClientAuthToken('');
    setIsAuthenticated(false);
    storage.clearAuthData();
    setError('');
    setIsAuthError(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Alchemiscale Dashboard</h1>

        {!isAuthenticated ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome, {username}!</h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You are successfully authenticated. Choose an option below to get started.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/networks"
                  className="block p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Networks</h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    Query and manage alchemical networks across different scopes
                  </p>
                </Link>

                <Link
                  href="/debug"
                  className="block p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">Debug Tools</h3>
                  <p className="text-purple-700 dark:text-purple-400 text-sm">
                    API diagnostic tools including ping, info, and service checks
                  </p>
                </Link>
              </div>
            </div>

            <AuthErrorBanner
              error={error}
              isAuthError={isAuthError}
              onReturnToLogin={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
}
