import Link from 'next/link';

interface AuthGateProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  message?: string;
}

export default function AuthGate({ isAuthenticated, children, message }: AuthGateProps) {
  if (!isAuthenticated) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800">
          {message || 'Please'}{' '}
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 underline">
            login
          </Link>{' '}
          first to view this content.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}