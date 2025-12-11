'use client';

import { useState } from 'react';

interface TaskRowProps {
  task: string;
  status: string;
  getStatusColor: (status: string) => { bg: string; text: string };
}

interface TaskDetails {
  checkpointSize?: number;
  checkpointSizeHuman?: string;
  objectCount?: number;
  loading?: boolean;
  error?: string;
}

interface SimulationAnalysis {
  key: string; // S3 object key
  mbar_analysis?: {
    free_energy_in_kT?: number;
    standard_error_in_kT?: number;
    number_of_uncorrelated_samples?: number;
    n_equilibrium_iterations?: number;
    statistical_inefficiency?: number;
  };
  timing_data?: {
    iteration_seconds?: number;
    average_seconds_per_iteration?: number;
    estimated_time_remaining?: string;
    estimated_localtime_finish_date?: string;
    estimated_total_time?: string;
    ns_per_day?: number;
  };
  iteration?: number;
  percent_complete?: number;
}

export default function TaskRow({ task, status, getStatusColor }: TaskRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState<TaskDetails | null>(null);
  const [simulationAnalyses, setSimulationAnalyses] = useState<SimulationAnalysis[]>([]);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const fetchSimulationAnalysis = async (prefix: string) => {
    setAnalysisLoading(true);

    try {
      // Search for simulation_real_time_analysis.yaml files
      const searchResponse = await fetch(
        `/api/r2/search?prefix=${encodeURIComponent(prefix)}/&filename=simulation_real_time_analysis.yaml`
      );

      if (!searchResponse.ok) {
        throw new Error('Failed to search for analysis files');
      }

      const searchData = await searchResponse.json();

      if (searchData.matches && searchData.matches.length > 0) {
        // Iterate over all matches
        const analyses: SimulationAnalysis[] = [];

        for (const match of searchData.matches) {
          try {
            // Fetch and parse each YAML file
            const objectResponse = await fetch(
              `/api/r2/object?key=${encodeURIComponent(match.key)}`
            );

            if (!objectResponse.ok) {
              console.error(`Failed to load ${match.key}`);
              continue;
            }

            const objectData = await objectResponse.json();

            if (objectData.parsed && Array.isArray(objectData.parsed)) {
              // Get the last element from the array
              const lastElement = objectData.parsed[objectData.parsed.length - 1];
              analyses.push({
                key: match.key,
                ...lastElement,
              });
            }
          } catch (err) {
            console.error(`Failed to process ${match.key}:`, err);
          }
        }

        setSimulationAnalyses(analyses);
      }
    } catch (err) {
      console.error(`Failed to fetch simulation analysis:`, err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const fetchTaskDetails = async () => {
    // Extract just the task ID part from the scoped key
    const taskIdParts = task.split('/');
    const taskName = taskIdParts[taskIdParts.length - 1];
    const prefix = `checkpoints/${taskName}`;

    setDetails({ loading: true });

    try {
      const response = await fetch(`/api/r2/size?prefix=${encodeURIComponent(prefix)}/`);

      if (!response.ok) {
        throw new Error('Failed to fetch checkpoint size');
      }

      const data = await response.json();

      setDetails({
        checkpointSize: data.totalSize,
        checkpointSizeHuman: data.humanReadableSize,
        objectCount: data.objectCount,
        loading: false,
      });

      // Also fetch simulation analysis in parallel
      fetchSimulationAnalysis(prefix);
    } catch (err) {
      console.error(`Failed to fetch details for task ${task}:`, err);
      setDetails({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load details',
      });
    }
  };

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);

    // Fetch details if expanding and not already loaded
    if (newExpanded && !details) {
      fetchTaskDetails();
    }
  };

  const colors = getStatusColor(status);

  return (
    <>
      <tr
        onClick={handleToggle}
        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
      >
        <td className="py-2 px-3 font-mono text-xs break-all">
          <div className="flex items-center">
            <svg
              className={`w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 transition-transform ${
                expanded ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {task}
          </div>
        </td>
        <td className="py-2 px-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text}`}
          >
            {status}
          </span>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-gray-50 dark:bg-gray-700">
          <td colSpan={2} className="py-3 px-6">
            {details?.loading ? (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400 mr-2"></div>
                Loading checkpoint details...
              </div>
            ) : details?.error ? (
              <div className="text-sm text-red-600 dark:text-red-400">{details.error}</div>
            ) : details ? (
              <div className="space-y-4">
                {/* Checkpoint Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Checkpoint Size:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{details.checkpointSizeHuman}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Objects:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{details.objectCount}</span>
                  </div>
                </div>

                {/* Simulation Analysis */}
                {analysisLoading && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400 mr-2"></div>
                    Loading simulation analysis...
                  </div>
                )}

                {simulationAnalyses.length > 0 && (
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-4 space-y-6">
                    {simulationAnalyses.map((analysis, index) => (
                      <div key={index} className="space-y-2">
                        {/* File Key */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {analysis.key}
                        </div>

                        {/* Iteration Info */}
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Iteration:</span> {analysis.iteration}
                          {analysis.percent_complete && (
                            <span className="ml-4">
                              <span className="font-semibold">Progress:</span> {analysis.percent_complete}%
                            </span>
                          )}
                        </div>

                        {/* Data Columns */}
                        <div className="grid grid-cols-2 gap-6 text-xs">
                          {/* MBAR Analysis Column */}
                          {analysis.mbar_analysis && (
                            <div className="space-y-1">
                              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">MBAR Analysis</h4>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Free Energy:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.mbar_analysis.free_energy_in_kT?.toFixed(4)} kT
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Std Error:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.mbar_analysis.standard_error_in_kT?.toFixed(4)} kT
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Uncorrelated Samples:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.mbar_analysis.number_of_uncorrelated_samples?.toFixed(1)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Equilibrium Iterations:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.mbar_analysis.n_equilibrium_iterations}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Statistical Inefficiency:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.mbar_analysis.statistical_inefficiency?.toFixed(4)}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Timing Data Column */}
                          {analysis.timing_data && (
                            <div className="space-y-1">
                              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Timing Data</h4>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Iteration Time:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.timing_data.iteration_seconds?.toFixed(2)} s
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Avg Time/Iteration:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.timing_data.average_seconds_per_iteration?.toFixed(2)} s
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">ns/day:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.timing_data.ns_per_day?.toFixed(2)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Est. Time Remaining:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.timing_data.estimated_time_remaining}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Est. Finish:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.timing_data.estimated_localtime_finish_date}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Est. Total Time:</span>
                                <span className="ml-2 font-mono text-gray-900 dark:text-white">
                                  {analysis.timing_data.estimated_total_time}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Separator between analyses if multiple */}
                        {index < simulationAnalyses.length - 1 && (
                          <div className="border-b border-gray-300 dark:border-gray-600 mt-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </td>
        </tr>
      )}
    </>
  );
}