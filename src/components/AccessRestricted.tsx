import { useAuth } from '../auth/AuthContext';
import '../assets/css/AccessRestricted.css';

interface AccessRestrictedProps {
  redirect?: string;
}

export default function AccessRestricted({ redirect }: AccessRestrictedProps) {
  const { login } = useAuth();
  const currentUrl = redirect || (typeof window !== 'undefined' ? window.location.href : '');

  const handleSignIn = () => {
    login(window.location.pathname + window.location.search);
  };

  const handleCreateAccount = () => {
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const accountsUrl = isLocal ? 'http://localhost:5174' : 'https://accounts.ascentracoresolutions.com';
    const target = encodeURIComponent(currentUrl);
    window.location.href = `${accountsUrl}/register?client_id=main&redirect=${target}`;
  };

  return (
    <div className="access-restricted-container">
      <div className="access-restricted-lock-wrapper">
        <div className="access-restricted-lock-icon">
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
            />
          </svg>
        </div>
      </div>

      <h1 className="access-restricted-title">Access Restricted</h1>
      <p className="access-restricted-desc">
        You need to sign in to access this feature. Join the SFS Blueprints community to save favorites, share your designs, and unlock premium content.
      </p>
      {currentUrl && (
        <p className="access-restricted-redirect">
          Sign in to access <b>{currentUrl}</b>
        </p>
      )}

      <div className="access-restricted-benefits">
        <h2>Member Benefits:</h2>
        <div className="access-restricted-benefit-item">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
          </svg>
          <span>Save unlimited blueprints</span>
        </div>
        <div className="access-restricted-benefit-item">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
          </svg>
          <span>Upload your own blueprints</span>
        </div>
        <div className="access-restricted-benefit-item">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
          </svg>
          <span>Rate and review designs</span>
        </div>
        <div className="access-restricted-benefit-item">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
          </svg>
          <span>Access to exclusive content</span>
        </div>
      </div>

      <div className="access-restricted-btns">
        <button type="button" className="access-restricted-btn" onClick={handleSignIn}>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
            />
            <path
              fillRule="evenodd"
              d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
          Sign In
        </button>

        <button type="button" className="access-restricted-btn" onClick={handleCreateAccount}>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            <path
              fillRule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
          Create Account
        </button>
      </div>
    </div>
  );
}
