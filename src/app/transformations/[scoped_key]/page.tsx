'use client';

import { useParams } from 'next/navigation';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { DefaultService } from '@/client';
import { useAuth } from '@/contexts/AuthContext';
import { useApiData } from '@/hooks/useApiData';
import { convertTupleListToObject, extractPropertyByKeyPattern, extractPropertiesFromMultipleKeys } from '@/lib/dataTransform';
import AuthGate from '@/components/AuthGate';
import DetailPageLayout from '@/components/DetailPageLayout';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import TransformationTasksTable from '@/components/TransformationTasksTable';
import SmilesViewer from '@/components/SmilesViewer';

export default function TransformationDetailPage() {
  const params = useParams();
  const scopedKey = decodeURIComponent(params.scoped_key as string);
  const { isAuthenticated } = useAuth();

  const { data: transformationData, loading, error } = useApiData({
    fetchFn: () => DefaultService.getTransformationTransformationsTransformationScopedKeyGet(scopedKey),
    enabled: isAuthenticated,
  });

  // Convert the data format from tuple lists to objects
  const formattedData = transformationData ? convertTupleListToObject(transformationData) : null;

  // Extract transformation name
  const { value: transformationName, error: nameError } = extractPropertyByKeyPattern<string>(
    formattedData,
    'Transformation-',
    'name'
  );

  // Extract SMILES from SmallMoleculeComponents
  const { values: smilesStrings, error: smilesError } = extractPropertiesFromMultipleKeys<string>(
    formattedData,
    'SmallMoleculeComponent-',
    'smiles',
    2
  );

  return (
    <DetailPageLayout title="Transformation Details" scopedKey={scopedKey}>
      <AuthGate isAuthenticated={isAuthenticated}>
        {loading ? (
          <LoadingState message="Loading transformation data..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="space-y-6">
            {nameError && (
              <ErrorState message={`Failed to extract transformation name: ${nameError}`} />
            )}

            {transformationName && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">{transformationName}</h2>
              </div>
            )}

            {smilesError && (
              <ErrorState message={`Failed to extract SMILES: ${smilesError}`} />
            )}

            {smilesStrings && smilesStrings.length === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Molecular Transformation</h3>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Initial State</p>
                    <SmilesViewer smiles={smilesStrings[0]} width={350} height={250} />
                  </div>
                  <div className="flex items-center">
                    <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Final State</p>
                    <SmilesViewer smiles={smilesStrings[1]} width={350} height={250} />
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tasks</h3>
              <TransformationTasksTable transformation={scopedKey} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Transformation Data</h3>
              <div className="max-h-96 overflow-auto">
                <JsonView data={formattedData as Record<string, unknown>} shouldExpandNode={(level) => level < 2} style={defaultStyles} />
              </div>
            </div>
          </div>
        )}
      </AuthGate>
    </DetailPageLayout>
  );
}
