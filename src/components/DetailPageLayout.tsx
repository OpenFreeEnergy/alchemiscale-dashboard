'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DetailPageLayoutProps {
  title: string;
  scopedKey?: string;
  backLink?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export default function DetailPageLayout({
  title,
  scopedKey,
  backLink,
  backLabel = '← Back',
  children,
}: DetailPageLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          {backLink ? (
            <Link href={backLink} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              {backLabel}
            </Link>
          ) : (
            <button
              onClick={() => router.back()}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {backLabel}
            </button>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h1>
          {scopedKey && (
            <p className="text-gray-600 dark:text-gray-400 font-mono text-sm break-all">{scopedKey}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}