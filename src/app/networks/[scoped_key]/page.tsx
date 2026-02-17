'use client';

import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { DefaultService } from '@/client';
import { useAuth } from '@/contexts/AuthContext';
import { useApiData } from '@/hooks/useApiData';
import AuthGate from '@/components/AuthGate';
import DetailPageLayout from '@/components/DetailPageLayout';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import ResourceList from '@/components/ResourceList';
import TransformationTasksTable from '@/components/TransformationTasksTable';

type Tab = 'status' | 'details' | 'transformations' | 'chemicalsystems';

interface NetworkStatus {
  [key: string]: number;
}

export default function NetworkDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const scopedKey = decodeURIComponent(params.scoped_key as string);
  const { isAuthenticated } = useAuth();

  // Initialize tab from URL or default to 'status'
  const initialTab = (searchParams.get('tab') as Tab) || 'status';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  // Update URL when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?tab=${tab}`, { scroll: false });
  };

  // Lazy load data for each tab
  const { data: status, loading: statusLoading, error: statusError } = useApiData<NetworkStatus>({
    fetchFn: () => DefaultService.getNetworkStatusNetworksNetworkScopedKeyStatusGet(scopedKey),
    enabled: isAuthenticated && activeTab === 'status',
  });

  const { data: networkDetails, loading: detailsLoading, error: detailsError } = useApiData({
    fetchFn: () => DefaultService.getNetworkNetworksNetworkScopedKeyGet(scopedKey),
    enabled: isAuthenticated && activeTab === 'details',
  });

  const { data: transformations, loading: transformationsLoading, error: transformationsError } = useApiData<string[]>({
    fetchFn: async () => {
      const result = await DefaultService.getNetworkTransformationsNetworksNetworkScopedKeyTransformationsGet(scopedKey);
      return result as string[];
    },
    enabled: isAuthenticated && activeTab === 'transformations',
  });

  const { data: chemicalSystems, loading: chemicalSystemsLoading, error: chemicalSystemsError } = useApiData<string[]>({
    fetchFn: async () => {
      const result = await DefaultService.getNetworkChemicalsystemsNetworksNetworkScopedKeyChemicalsystemsGet(scopedKey);
      return result as string[];
    },
    enabled: isAuthenticated && activeTab === 'chemicalsystems',
  });

  // Calculate total tasks for status
  const getTotalTasks = (statusData: NetworkStatus): number => {
    return Object.values(statusData).reduce((sum, count) => sum + count, 0);
  };

  // Determine current tab's loading/error state
  const loading =
    (activeTab === 'status' && statusLoading) ||
    (activeTab === 'details' && detailsLoading) ||
    (activeTab === 'transformations' && transformationsLoading) ||
    (activeTab === 'chemicalsystems' && chemicalSystemsLoading);

  const error =
    (activeTab === 'status' && statusError) ||
    (activeTab === 'details' && detailsError) ||
    (activeTab === 'transformations' && transformationsError) ||
    (activeTab === 'chemicalsystems' && chemicalSystemsError);


  return (
    <DetailPageLayout
      title="Network Details"
      scopedKey={scopedKey}
      backLink="/networks"
      backLabel="← Back to Networks"
    >
      <AuthGate isAuthenticated={isAuthenticated}>
        <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => handleTabChange('status')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'status'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    Status
                  </button>
                  <button
                    onClick={() => handleTabChange('details')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleTabChange('transformations')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'transformations'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    Transformations
                  </button>
                  <button
                    onClick={() => handleTabChange('chemicalsystems')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'chemicalsystems'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    Chemical Systems
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {loading ? (
                  <LoadingState message={`Loading ${activeTab}...`} />
                ) : error ? (
                  <ErrorState message={error} />
                ) : (
                  <>
                    {/* Status Tab Content */}
                    {activeTab === 'status' && (
                      <div>
                        {status ? (
                          <>
                            <div className="mb-4">
                              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Task Status Summary</h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                Total Tasks: <span className="font-semibold">{getTotalTasks(status)}</span>
                              </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(status).map(([statusName, count]) => (
                            <div
                              key={statusName}
                              className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                  {statusName}
                                </span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{count}</span>
                              </div>
                              {getTotalTasks(status) > 0 && (
                                <div className="mt-2">
                                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                                      style={{ width: `${(count / getTotalTasks(status)) * 100}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {((count / getTotalTasks(status)) * 100).toFixed(1)}%
                                  </p>
                                </div>
                              )}
                                </div>
                              ))}
                            </div>

                            {Object.keys(status).length === 0 && (
                              <p className="text-gray-600 dark:text-gray-400 text-center py-8">No status data available</p>
                            )}
                          </>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No status data available</p>
                        )}
                      </div>
                    )}

                    {/* Details Tab Content */}
                    {activeTab === 'details' && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Network Details</h3>
                        {networkDetails ? (
                          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto text-sm max-h-96 text-gray-900 dark:text-gray-100">
                            {JSON.stringify(networkDetails, null, 2)}
                          </pre>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No network details available</p>
                        )}
                      </div>
                    )}

                    {/* Transformations Tab Content */}
                    {activeTab === 'transformations' && transformations && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                          Transformations ({transformations.length})
                        </h3>

                        {transformations.length > 0 ? (
                          <div className="space-y-4">
                            {transformations.map((transformation, index) => (
                              <TransformationTasksTable
                                key={index}
                                transformation={transformation}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No transformations found</p>
                        )}
                      </div>
                    )}

                    {/* Chemical Systems Tab Content */}
                    {activeTab === 'chemicalsystems' && chemicalSystems && (
                      <ResourceList
                        items={chemicalSystems}
                        title="Chemical Systems"
                        getHref={(item) => `/chemicalsystems/${encodeURIComponent(item)}`}
                        emptyMessage="No chemical systems found"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
        </div>
      </AuthGate>
    </DetailPageLayout>
  );
}
