import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Loader2, ShieldCheck, Terminal } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const LoginRedirect: React.FC = () => {
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/profile');
      } else {
        login('/profile');
      }
    }
  }, [isLoading, user, login, navigate]);

  return (
    <>
      <SEOHead title="Account Authentication | Ascentracore Solutions" description="Sign in to your Ascentracore unified developer account." canonicalUrl="/login" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Connecting to Central Accounts SSO</h2>
        <p className="text-sm text-slate-400">Redirecting to secure authentication service...</p>
      </div>
    </>
  );
};

export const RegisterRedirect: React.FC = () => {
  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const accountsUrl = isLocal ? 'http://localhost:5174' : 'https://accounts.ascentracoresolutions.com';
    window.location.href = `${accountsUrl}/register?client_id=main`;
  }, []);

  return (
    <>
      <SEOHead title="Register Developer Account | Ascentracore Solutions" description="Create an Ascentracore account." canonicalUrl="/register" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Opening Registration Portal</h2>
        <p className="text-sm text-slate-400">Taking you to Ascentracore unified account signup...</p>
      </div>
    </>
  );
};

export const DashboardRedirect: React.FC = () => {
  const { user, isLoading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/profile');
      } else {
        login('/profile');
      }
    }
  }, [isLoading, user, login, navigate]);

  return (
    <>
      <SEOHead title="Developer Dashboard | Ascentracore Solutions" description="Manage your cloud blueprints, assessments, and developer profile." canonicalUrl="/dashboard" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Loading Developer Dashboard</h2>
        <p className="text-sm text-slate-400">Verifying session credentials...</p>
      </div>
    </>
  );
};

export const CompilerRedirect: React.FC = () => {
  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const codelabUrl = isLocal ? 'http://localhost:8443/compilers/all' : 'https://skiltrix.ascentracoresolutions.com/compilers/all';
    window.location.href = codelabUrl;
  }, []);

  return (
    <>
      <SEOHead title="SkilTrix Cloud Compiler | Ascentracore Solutions" description="Multi-language sandboxed code execution environment." canonicalUrl="/compiler" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <Terminal className="w-12 h-12 text-emerald-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Launching SkilTrix CodeLab Compiler</h2>
        <p className="text-sm text-slate-400 mb-4">Redirecting to multi-language isolated cloud sandbox...</p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>If not redirected automatically, <a href="https://skiltrix.ascentracoresolutions.com/compilers/all" className="text-emerald-400 underline">click here to launch</a></span>
        </div>
      </div>
    </>
  );
};

export const AdminRedirect: React.FC = () => {
  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const adminUrl = isLocal ? 'http://localhost:5175' : 'https://admin.ascentracoresolutions.com';
    window.location.href = adminUrl;
  }, []);

  return (
    <>
      <SEOHead title="Management Console | Ascentracore Solutions" description="Ascentracore administrative control panel." canonicalUrl="/admin" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <ShieldCheck className="w-12 h-12 text-emerald-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Ascentracore Admin Panel</h2>
        <p className="text-sm text-slate-400 mb-4">Redirecting to Ascentracore Unified Admin Control Center...</p>
        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
      </div>
    </>
  );
};
