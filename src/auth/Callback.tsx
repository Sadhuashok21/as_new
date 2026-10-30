import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { exchangeAuthorizationCode, resolveAccountsUrl, resolveApiOrigin } from './pkce'
import { useAuth } from './AuthContext'

export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { refreshSession } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const isExecutingRef = useRef(false)

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state') || ''
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setError(searchParams.get('error_description') || errorParam || 'Authentication failed.')
      return
    }

    if (!code) {
      setError('Authorization code missing from identity callback.')
      return
    }

    if (isExecutingRef.current) return
    isExecutingRef.current = true

    const config = {
      clientId: 'main',
      accountsPortalUrl: resolveAccountsUrl(import.meta.env.VITE_ACCOUNTS_URL),
      apiBaseUrl: resolveApiOrigin(import.meta.env.VITE_API_BASE_URL),
      redirectUri: `${window.location.origin}/auth/callback`,
    }

    exchangeAuthorizationCode(config, code, state)
      .then(async (result) => {
        localStorage.setItem('sfs_access_token', result.accessToken)
        await refreshSession()
        navigate(result.returnTo || '/profile', { replace: true })
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to complete authorization.')
      })
  }, [searchParams, navigate, refreshSession])

  if (error) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '440px', textAlign: 'center', background: '#0a0a14', color: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #1e1e38' }}>
          <div style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>SFS Single Sign-On Error</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{error}</p>
          <button
            onClick={() => window.location.assign('/sfs')}
            style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid #e0e7ff', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '0.9rem' }}>Signing into Spaceflight Simulator with Ascentracore SSO…</p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
