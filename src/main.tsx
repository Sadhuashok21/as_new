import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Layout & Context
import { Layout } from './components/Layout.tsx';
import { AuthProvider } from './auth/AuthContext.tsx';
import { AuthCallback } from './auth/Callback.tsx';
import { UtmTracker } from './components/UtmTracker.tsx';

// Code-split pages with dynamic lazy imports for maximum Lighthouse performance
const Home = lazy(() => import('./pages/Home.tsx').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About.tsx').then(m => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services.tsx').then(m => ({ default: m.Services })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.tsx').then(m => ({ default: m.ServiceDetail })));
const Products = lazy(() => import('./pages/Products.tsx').then(m => ({ default: m.Products })));
const ProductDetail = lazy(() => import('./pages/ProductDetail.tsx').then(m => ({ default: m.ProductDetail })));
const Blog = lazy(() => import('./pages/Blog.tsx').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost.tsx').then(m => ({ default: m.BlogPost })));
const Tutorials = lazy(() => import('./pages/Tutorials.tsx').then(m => ({ default: m.Tutorials })));
const TutorialCategory = lazy(() => import('./pages/TutorialCategory.tsx').then(m => ({ default: m.TutorialCategory })));
const TutorialView = lazy(() => import('./pages/TutorialView.tsx').then(m => ({ default: m.TutorialView })));
const Resources = lazy(() => import('./pages/Resources.tsx').then(m => ({ default: m.Resources })));
const CaseStudies = lazy(() => import('./pages/CaseStudies.tsx').then(m => ({ default: m.CaseStudies })));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail.tsx').then(m => ({ default: m.CaseStudyDetail })));
const Contact = lazy(() => import('./pages/Contact.tsx').then(m => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.tsx').then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Terms.tsx').then(m => ({ default: m.Terms })));
const Search = lazy(() => import('./pages/Search.tsx').then(m => ({ default: m.Search })));
const NotFound = lazy(() => import('./pages/NotFound.tsx').then(m => ({ default: m.NotFound })));

// App Redirects & Workspaces
import { LoginRedirect, RegisterRedirect, DashboardRedirect, CompilerRedirect, AdminRedirect } from './pages/AppRedirects.tsx';
const Profile = lazy(() => import('./pages/Profile.tsx'));
const SFSIndex = lazy(() => import('./pages/SFSIndex.tsx'));
const SFSHome = lazy(() => import('./pages/SFSHome.tsx'));
const SFSBlueprints = lazy(() => import('./pages/SFSBlueprints.tsx'));
const SFSBlueprintDetail = lazy(() => import('./pages/SFSBlueprintDetail.tsx'));
const SFSFavorites = lazy(() => import('./pages/SFSFavorites.tsx'));
const SFSPlanets = lazy(() => import('./pages/SFSPlanets.tsx'));
const Upload = lazy(() => import('./pages/Upload.tsx'));
const AccessDenied = lazy(() => import('./pages/AccessDenied.tsx'));
const Index = lazy(() => import('./pages/Index.tsx'));

const PageFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '32px', height: '32px', border: '3px solid rgba(147,51,234,0.3)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider config={{ clientId: 'main' }}>
      <BrowserRouter>
        <UtmTracker />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Public Publisher & Company Content (Unified Header & Footer) */}
            {/* Real Software Development Services Landing Page (D:\fornted-copy\as) */}
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Index />} />
            <Route path="/platform" element={<Layout><Home /></Layout>} />
            <Route path="/developer-hub" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/products/:slug" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
            <Route path="/tutorials" element={<Layout><Tutorials /></Layout>} />
            <Route path="/tutorials/:category" element={<Layout><TutorialCategory /></Layout>} />
            <Route path="/tutorials/:category/:slug" element={<Layout><TutorialView /></Layout>} />
            <Route path="/resources" element={<Layout><Resources /></Layout>} />
            <Route path="/case-studies" element={<Layout><CaseStudies /></Layout>} />
            <Route path="/case-studies/:slug" element={<Layout><CaseStudyDetail /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            <Route path="/search" element={<Layout><Search /></Layout>} />

            {/* User Profile & Account */}
            <Route path="/profile" element={<Layout><Profile /></Layout>} />

            {/* Application Screen Redirects (No AdSense Ads) */}
            <Route path="/login" element={<LoginRedirect />} />
            <Route path="/register" element={<RegisterRedirect />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/compiler" element={<CompilerRedirect />} />
            <Route path="/admin" element={<AdminRedirect />} />

            {/* Spaceflight Simulator (SFS Blueprints) Platform */}
            <Route path="/sfs" element={<SFSIndex />} />
            <Route path="/sfs/landing" element={<SFSIndex />} />
            <Route path="/sfs/home" element={<SFSHome />} />
            <Route path="/sfs/blueprints" element={<SFSBlueprints />} />
            <Route path="/blueprints" element={<SFSBlueprints />} />
            <Route path="/sfs/blueprints/blueprint" element={<SFSBlueprintDetail />} />
            <Route path="/sfs/blueprints/:slug" element={<SFSBlueprintDetail />} />
            <Route path="/sfs/blueprint/:id" element={<SFSBlueprintDetail />} />
            <Route path="/sfs/planets" element={<SFSPlanets />} />
            <Route path="/sfs/planets-and-worlds" element={<SFSPlanets />} />
            <Route path="/planetsandworlds" element={<SFSPlanets />} />
            <Route path="/sfs/profile/favorites" element={<SFSFavorites />} />
            <Route path="/sfs/favorites" element={<SFSFavorites />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/sfs/upload" element={<Upload />} />
            <Route path="/uploads" element={<Upload />} />
            <Route path="/sfs/access_denied" element={<AccessDenied />} />
            <Route path="/sfs/access-denied" element={<AccessDenied />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/access_denied" element={<AccessDenied />} />
            <Route path="/consult" element={<Index />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
