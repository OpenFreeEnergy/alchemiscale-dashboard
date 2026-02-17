'use client';

import { useParams } from 'next/navigation';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { DefaultService } from '@/client';
import { useAuthenticatedPage } from '@/hooks/useAuthenticatedPage';
import { useApiData } from '@/hooks/useApiData';
import { convertTupleListToObject } from '@/lib/dataTransform';
import AuthGate from '@/components/AuthGate';
import DetailPageLayout from '@/components/DetailPageLayout';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

export default function ChemicalSystemDetailPage() {
  const params = useParams();
  const scopedKey = decodeURIComponent(params.scoped_key as string);
  const { isAuthenticated } = useAuthenticatedPage();

  const { data: chemicalSystemData, loading, error } = useApiData({
    fetchFn: () => DefaultService.getChemicalsystemChemicalsystemsChemicalsystemScopedKeyGet(scopedKey),
    enabled: isAuthenticated,
  });

  // Convert the data format from tuple lists to objects
  const formattedData = chemicalSystemData ? convertTupleListToObject(chemicalSystemData) : null;

  return (
    <DetailPageLayout title="Chemical System Details" scopedKey={scopedKey}>
      <AuthGate isAuthenticated={isAuthenticated}>
        {loading ? (
          <LoadingState message="Loading chemical system data..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Chemical System Data</h3>
            <div className="max-h-96 overflow-auto">
              <JsonView data={formattedData as Record<string, unknown>} shouldExpandNode={(level) => level < 2} style={defaultStyles} />
            </div>
          </div>
        )}
      </AuthGate>
    </DetailPageLayout>
  );
}
