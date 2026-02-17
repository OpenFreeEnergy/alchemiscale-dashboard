import Link from 'next/link';

interface ResourceListProps {
  items: string[];
  title?: string;
  getHref: (item: string) => string;
  emptyMessage?: string;
}

export default function ResourceList({
  items,
  title,
  getHref,
  emptyMessage = 'No items found',
}: ResourceListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {title} ({items.length})
        </h3>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <Link
            key={index}
            href={getHref(item)}
            className="block p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 font-mono text-sm text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <span className="break-all">{item}</span>
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
        ))}
      </div>
    </div>
  );
}