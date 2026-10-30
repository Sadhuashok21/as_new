import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useSEO } from '../hooks/useSEO';
import { useAuth } from '../auth/AuthContext';
import AccessRestricted from '../components/AccessRestricted';

function Profile() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  useSEO({
    title: 'Profile || Ashok SFS',
    description: 'Manage your Spaceflight Simulator blueprints, view saved favorites, and track downloads.',
    keywords: 'SFS profile, Spaceflight Simulator user, favorites, blueprints management',
  });

  const accountsUrl = (import.meta.env.VITE_ACCOUNTS_URL || 'http://localhost:5174').replace(/\/+$/, '');

  if (!isLoading && !isAuthenticated) {
    return (
      <Sidebar
        breadcrumbs={[
          { label: 'Home', to: '/sfs' },
          { label: 'Access Denied' },
        ]}
      >
        <AccessRestricted redirect={typeof window !== 'undefined' ? window.location.href : undefined} />
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="bread_crumb">
        <p>
          &gt; <Link to="/sfs">Home</Link> &gt; Profile
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', width: '100%' }}>
        <div style={{
          background: 'color-mix(in oklab, var(--purple-950) 40%, transparent)',
          border: '1px solid var(--purple-900)',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(128, 0, 255, 0.2)'
        }}>
          {/* Avatar */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: isAuthenticated ? 'var(--purple-600)' : '#334155',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {isAuthenticated ? (user?.name ? user.name[0].toUpperCase() : 'U') : '?'}
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.5rem 0' }}>
            {isAuthenticated ? `${user?.name} ${user?.lastname || ''}`.trim() : 'Guest Builder'}
          </h1>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem', margin: '0 0 1.5rem 0' }}>
            {isAuthenticated ? user?.email : 'Not signed in. Connect your Ascentracore identity to save and upload blueprints.'}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {isLoading ? (
              <span style={{ color: '#94a3b8' }}>Checking single sign-on…</span>
            ) : isAuthenticated ? (
              <>
                <a
                  href={`${accountsUrl}/settings`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                  }}
                >
                  Manage Ascentracore Account ↗
                </a>
                <button
                  type="button"
                  onClick={() => logout(false)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #ef4444',
                    background: 'transparent',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => login('/profile')}
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'var(--purple-600)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                }}
              >
                Sign In with Ascentracore Accounts (SSO)
              </button>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            margin: '1.5rem 0'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--purple-200)' }}>12</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Uploaded BPs</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--purple-200)' }}>4.9K</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Total Downloads</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--purple-200)' }}>8</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Favorited BPs</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link to="/upload">
              <button style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: 'var(--purple-901)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                Upload New Blueprint
              </button>
            </Link>
            <Link to="/blueprints">
              <button style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'transparent',
                color: '#fff',
                cursor: 'pointer'
              }}>
                Browse Blueprints
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Profile;