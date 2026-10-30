import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import type { AuthUser, AuthContextType, ClientAuthConfig } from './types'
import { initiateLogin, resolveApiOrigin, resolveAccountsUrl } from './pkce'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEFAULT_CONFIG: ClientAuthConfig = {
  clientId: 'main',
  accountsPortalUrl: resolveAccountsUrl(import.meta.env.VITE_ACCOUNTS_URL),
  apiBaseUrl: resolveApiOrigin(import.meta.env.VITE_API_BASE_URL),
  redirectUri: typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : 'http://localhost:5175/auth/callback',
}

export const AuthProvider: React.FC<{ children: React.ReactNode; config?: Partial<ClientAuthConfig> }> = ({
  children,
  config: customConfig,
}) => {
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...customConfig }), [customConfig])
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = useCallback(async (): Promise<AuthUser | null> => {
    let token = localStorage.getItem('sfs_access_token') || localStorage.getItem('access_token')

    // 1. If no local token, check for active silent SSO session on central backend
    if (!token) {
      try {
        const ssoRes = await fetch(`${config.apiBaseUrl}/api/accounts/sso/check/?client_id=main`, {
          credentials: 'include',
          headers: { Accept: 'application/json' },
        })
        const ssoData = await ssoRes.json().catch(() => null)
        if (ssoData?.authenticated && ssoData?.access_token) {
          const receivedToken = String(ssoData.access_token)
          token = receivedToken
          localStorage.setItem('sfs_access_token', receivedToken)
          if (ssoData.user?.user_id) {
            localStorage.setItem('user_id', ssoData.user.user_id)
          }
          setUser(ssoData.user)
          setAccessToken(receivedToken)
          setIsLoading(false)
          return ssoData.user
        }
      } catch {
        // Silent check failed
      }
    }

    if (!token) {
      setUser(null)
      setAccessToken(null)
      setIsLoading(false)
      return null
    }

    try {
      const res = await fetch(`${config.apiBaseUrl}/api/accounts/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      if (!res.ok) {
        // Attempt silent SSO recovery
        try {
          const ssoRes = await fetch(`${config.apiBaseUrl}/api/accounts/sso/check/?client_id=main`, {
            credentials: 'include',
            headers: { Accept: 'application/json' },
          })
          const ssoData = await ssoRes.json().catch(() => null)
          if (ssoData?.authenticated && ssoData?.access_token) {
            const newToken = String(ssoData.access_token)
            localStorage.setItem('sfs_access_token', newToken)
            if (ssoData.user?.user_id) {
              localStorage.setItem('user_id', ssoData.user.user_id)
            }
            setUser(ssoData.user)
            setAccessToken(newToken)
            setIsLoading(false)
            return ssoData.user
          }
        } catch {}

        localStorage.removeItem('sfs_access_token')
        setUser(null)
        setAccessToken(null)
        setIsLoading(false)
        return null
      }

      const data = await res.json()
      setUser(data.user)
      setAccessToken(token)
      setIsLoading(false)
      return data.user
    } catch {
      setIsLoading(false)
      return null
    }
  }, [config.apiBaseUrl])

  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  const login = useCallback(async (returnTo?: string) => {
    await initiateLogin(config, returnTo)
  }, [config])

  const logout = useCallback(async (global: boolean = false) => {
    const token = accessToken || localStorage.getItem('sfs_access_token')
    if (token) {
      try {
        const endpoint = global ? '/api/accounts/logout-all/' : '/api/accounts/logout/'
        await fetch(`${config.apiBaseUrl}${endpoint}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {}
    }

    localStorage.removeItem('sfs_access_token')
    setUser(null)
    setAccessToken(null)

    if (global) {
      window.location.assign(`${config.accountsPortalUrl}/login?logged_out=1`)
    }
  }, [accessToken, config])

  const getCurrentUser = useCallback(() => user, [user])

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    accessToken,
    login,
    logout,
    refreshSession,
    getCurrentUser,
  }), [user, isLoading, accessToken, login, logout, refreshSession, getCurrentUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
