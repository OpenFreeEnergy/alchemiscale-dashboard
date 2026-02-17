'use client';

import { useState, useEffect } from 'react';
import { DefaultService } from '@/client';
import { configureAlchemiscaleClient } from '@/lib/alchemiscale-client';
import { handleAuthError } from '@/lib/auth-errors';
import { AuthErrorBanner } from '@/components/AuthErrorBanner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DebugPage() {
  const router = useRouter();
  const [pingStatus, setPingStatus] = useState<string>('');
  const [apiInfo, setApiInfo] = useState<Record<string, unknown> | null>(null);
  const [checkStatus, setCheckStatus] = useState<string>('');
  const [error, setError] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);
  const [r2Prefix, setR2Prefix] = useState<string>('checkpoints/');
  const [r2Data, setR2Data] = useState<{ bucket: string; prefix: string; count: number; prefixes: string[] } | null>(null);
  const [r2Loading, setR2Loading] = useState(false);

  // Configure the client on mount
  useEffect(() => {
    configureAlchemiscaleClient();
  }, []);

  // Ping API
  const handlePing = async () => {
    try {
      setError('');
      setIsAuthError(false);
      const response = await DefaultService.pingPingGet();
      setPingStatus(JSON.stringify(response, null, 2));
    } catch (err) {
      const authError = handleAuthError(err);
      setPingStatus(`Error: ${authError.message}`);
      setError(authError.message);
      setIsAuthError(authError.isAuthError);
    }
  };

  // Get API info
  const handleGetInfo = async () => {
    try {
      setError('');
      setIsAuthError(false);
      const info = await DefaultService.infoInfoGet();
      setApiInfo(info as Record<string, unknown>);
    } catch (err) {
      const authError = handleAuthError(err);
      setError(`Failed to get API info: ${authError.message}`);
      setIsAuthError(authError.isAuthError);
      setApiInfo(null);
    }
  };

  // Check connectivity
  const handleCheck = async () => {
    try {
      setError('');
      setIsAuthError(false);
      await DefaultService.checkCheckGet();
      setCheckStatus('✓ All services are reachable');
    } catch (err) {
      const authError = handleAuthError(err);
      setCheckStatus(`✗ Service check failed: ${authError.message}`);
      setError(authError.message);
      setIsAuthError(authError.isAuthError);
    }
  };

  // Navigate back to dashboard/login
  const handleReturnToLogin = () => {
    router.push('/dashboard');
  };

  // List R2 prefixes
  const handleListR2Prefixes = async () => {
    try {
      setR2Loading(true);
      setError('');
      setIsAuthError(false);

      const response = await fetch(`/api/r2/prefixes?prefix=${encodeURIComponent(r2Prefix)}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to list R2 prefixes');
      }

      const data = await response.json();
      setR2Data(data);
    } catch (err) {
      setError(`Failed to list R2 prefixes: ${err instanceof Error ? err.message : String(err)}`);
      setR2Data(null);
    } finally {
      setR2Loading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">API Debug Tools</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Diagnostic Actions</h2>

          <div className="space-y-3">
            <button
              onClick={handlePing}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Ping API
            </button>
            <button
              onClick={handleGetInfo}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Get API Info
            </button>
            <button
              onClick={handleCheck}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Check Services
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">R2 Bucket Browser</h2>

          <div className="space-y-3">
            <div>
              <label htmlFor="r2-prefix" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prefix (e.g., checkpoints/)
              </label>
              <input
                id="r2-prefix"
                type="text"
                value={r2Prefix}
                onChange={(e) => setR2Prefix(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="checkpoints/"
              />
            </div>
            <button
              onClick={() => handleListR2Prefixes()}
              disabled={r2Loading}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {r2Loading ? 'Loading...' : 'List R2 Prefixes'}
            </button>
          </div>
        </div>

        <AuthErrorBanner
          error={error}
          isAuthError={isAuthError}
          onReturnToLogin={handleReturnToLogin}
        />

        {pingStatus && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Ping Response</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto text-sm text-gray-900 dark:text-gray-100">
              {pingStatus}
            </pre>
          </div>
        )}

        {apiInfo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">API Information</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto text-sm text-gray-900 dark:text-gray-100">
              {JSON.stringify(apiInfo, null, 2)}
            </pre>
          </div>
        )}

        {checkStatus && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Service Check</h3>
            <p className={`text-lg ${checkStatus.startsWith('✓') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {checkStatus}
            </p>
          </div>
        )}

        {r2Data && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">R2 Bucket Contents</h3>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Bucket:</strong> {r2Data.bucket}</p>
              <p><strong>Prefix:</strong> {r2Data.prefix || '(root)'}</p>
              <p><strong>Found:</strong> {r2Data.count} prefixes</p>
            </div>
            {r2Data.prefixes && r2Data.prefixes.length > 0 ? (
              <div className="space-y-2">
                {r2Data.prefixes.map((prefix: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <code className="text-sm text-gray-900 dark:text-gray-100">{prefix}</code>
                    <button
                      onClick={() => {
                        setR2Prefix(prefix + '/');
                      }}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Browse →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No prefixes found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
