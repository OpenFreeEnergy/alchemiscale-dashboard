'use client';

import { useState } from 'react';
import { DefaultService } from '@/client';
import { useAuth } from '@/contexts/AuthContext';
import { useApiData } from '@/hooks/useApiData';
import Link from 'next/link';
import AuthGate from '@/components/AuthGate';
import ResourceList from '@/components/ResourceList';
import ErrorState from '@/components/ErrorState';

export default function NetworksPage() {
  const { isAuthenticated, authData } = useAuth();
  const [org, setOrg] = useState('*');
  const [campaign, setCampaign] = useState('*');
  const [project, setProject] = useState('*');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [networks, setNetworks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch available scopes
  const { data: availableScopes, loading: loadingScopes } = useApiData<string[]>({
    fetchFn: async () => {
      if (!authData || !authData.username) {
        throw new Error('Username not found. Please login again.');
      }
      return DefaultService.listScopesIdentitiesIdentityIdentifierScopesGet(authData.username);
    },
    enabled: isAuthenticated && !!authData?.username,
  });

  // Query networks
  const handleQueryNetworks = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setNetworks([]);

    try {
      const response = await DefaultService.queryNetworksNetworksGet(
        name || undefined,
        state || undefined,
        org || undefined,
        campaign || undefined,
        project || undefined,
      );

      setNetworks(response as string[]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to query networks: ${message}`);
      console.error('Query error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Set preset scope
  const setPresetScope = (orgVal: string, campaignVal: string, projectVal: string) => {
    setOrg(orgVal);
    setCampaign(campaignVal);
    setProject(projectVal);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Query Networks</h1>

        <AuthGate isAuthenticated={isAuthenticated}>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Scope Parameters</h2>

              <form onSubmit={handleQueryNetworks} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="org" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Organization
                    </label>
                    <input
                      id="org"
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="*"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="campaign" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Campaign
                    </label>
                    <input
                      id="campaign"
                      type="text"
                      value={campaign}
                      onChange={(e) => setCampaign(e.target.value)}
                      placeholder="*"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project
                    </label>
                    <input
                      id="project"
                      type="text"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder="*"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Network Name (optional)
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Filter by name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      State (optional)
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Filter by state"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {loadingScopes ? (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Loading available scopes...
                  </div>
                ) : availableScopes && availableScopes.length > 0 ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Available Scopes (click to select)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setPresetScope('*', '*', '*')}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        All (*-*-*)
                      </button>
                      {availableScopes.map((scope, index) => {
                        const parts = scope.split('-');
                        const [scopeOrg, scopeCampaign, scopeProject] = parts.length === 3
                          ? parts
                          : [scope, '*', '*'];

                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setPresetScope(scopeOrg, scopeCampaign, scopeProject)}
                            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-mono"
                          >
                            {scope}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    No scopes available. You can still use wildcards (*) to query.
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Querying...' : 'Query Networks'}
                  </button>
                </div>
              </form>
            </div>

            {error && <ErrorState message={error} />}

            {networks.length > 0 && (
              <ResourceList
                items={networks}
                title="Networks Found"
                getHref={(network) => `/networks/${encodeURIComponent(network)}`}
                emptyMessage="No networks found. Try adjusting your scope parameters."
              />
            )}

            {!loading && networks.length === 0 && !error && (
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No networks found. Try adjusting your scope parameters.
                </p>
              </div>
            )}
          </div>
        </AuthGate>
      </div>
    </div>
  );
}
