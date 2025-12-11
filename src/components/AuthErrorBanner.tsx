/**
 * Reusable component for displaying authentication errors
 * Shows a user-friendly message when the session expires with a link back to login
 */

interface AuthErrorBannerProps {
  error: string;
  isAuthError: boolean;
  onReturnToLogin?: () => void;
}

export function AuthErrorBanner({ error, isAuthError, onReturnToLogin }: AuthErrorBannerProps) {
  if (!error) return null;

  return (
    <div
      className={`border rounded-lg p-4 ${
        isAuthError
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <p className={isAuthError ? 'text-yellow-800' : 'text-red-600'}>
        {isAuthError && '⚠️ '}
        {error}
      </p>
      {isAuthError && onReturnToLogin && (
        <button
          onClick={onReturnToLogin}
          className="mt-3 text-sm text-yellow-700 underline hover:text-yellow-900"
        >
          Return to login
        </button>
      )}
    </div>
  );
}