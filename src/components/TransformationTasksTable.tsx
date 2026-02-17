'use client';

import { useState, useEffect, useCallback } from 'react';
import { DefaultService } from '@/client';
import Link from 'next/link';
import TaskRow from './TaskRow';

interface Task {
  task: string;
  status: string;
}

interface TransformationTasksTableProps {
  transformation: string;
}

const bannedStatuses = new Set(["invalid", "deleted"])

export default function TransformationTasksTable({ transformation }: TransformationTasksTableProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch all tasks for this transformation
      const allTasks = await DefaultService.getTransformationTasksTransformationsTransformationScopedKeyTasksGet(
        transformation,
        undefined,
        'list',
        undefined
      );

      if (allTasks && Array.isArray(allTasks) && allTasks.length > 0) {
        // Fetch all task statuses in parallel
        const results = await Promise.allSettled(
          allTasks.map((task) =>
            DefaultService.getTaskStatusTasksTaskScopedKeyStatusGet(task)
          )
        );

        const tasksWithStatus: Task[] = [];

        for (let i = 0; i < allTasks.length; i++) {
          const result = results[i];
          let status: string;

          if (result.status === 'fulfilled') {
            status = result.value || 'unknown';
          } else {
            console.error(`Failed to fetch status for task ${allTasks[i]}:`, result.reason);
            status = 'unknown';
          }

          if (bannedStatuses.has(status)) {
            continue;
          }

          tasksWithStatus.push({
            task: allTasks[i],
            status,
          });
        }

        setTasks(tasksWithStatus);
      } else {
        setTasks([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load tasks';
      console.error(`Failed to fetch tasks for ${transformation}:`, err);
      setError(message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [transformation]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const getStatusColor = (status: string): {bg: string, text: string} => {
    const colors = {
      error: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300' },
      complete: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
      running: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-300' },
      waiting: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300' },
    };
    return colors[status as keyof typeof colors] || { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-800 dark:text-gray-300' };
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
      <Link
        href={`/transformations/${encodeURIComponent(transformation)}`}
        className="block p-3 font-mono text-sm bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
      >
        <div className="flex justify-between items-center">
          <span className="break-all">{transformation}</span>
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2"
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
        </div>
      </Link>

      <div className="p-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading tasks...</span>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        ) : tasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">Task</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300 w-32">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((taskData, taskIndex) => (
                  <TaskRow
                    key={taskIndex}
                    task={taskData.task}
                    status={taskData.status}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks found</p>
        )}
      </div>
    </div>
  );
}
