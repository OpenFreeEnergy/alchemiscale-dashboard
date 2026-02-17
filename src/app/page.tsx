import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Alchemiscale Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage your computational chemistry workflows with ease
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Getting Started
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This is a TypeScript client for the Alchemiscale API, built with Next.js and
              automatically generated from the OpenAPI specification.
            </p>
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="inline-block w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>TypeScript client with full type safety</li>
                <li>Authentication and token management</li>
                <li>Network and transformation management</li>
                <li>Task creation and monitoring</li>
                <li>Result retrieval and analysis</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                About Alchemiscale
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Alchemiscale is a distributed workflow management system for computational
                chemistry, enabling scalable execution of alchemical free energy calculations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
