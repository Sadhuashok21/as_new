import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { appendUtmToUrl } from '../utils/utmTracker';
import '../assets/css/SFSSidebar.css';

interface SidebarProps {
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; to?: string }>;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export default function Sidebar({
  children,
  breadcrumbs,
  searchQuery = '',
  onSearchChange,
}: SidebarProps) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarActive(!sidebarActive);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchInput);
    } else {
      navigate(`/sfs/blueprints?search=${encodeURIComponent(searchInput)}`);
    }
  };

  const isActive = (path: string) => {
    if (path === '/sfs/home' || path === '/sfs') {
      return location.pathname === '/sfs' || location.pathname === '/sfs/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="sfs-root-layout">
      {/* ── Top Toolbar (from sidebar.html) ─────────────────────────── */}
      <div className="toolbar">
        <div className="grid">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
            style={{ background: 'transparent', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="as as-list"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          &ensp;
          <Link to={appendUtmToUrl('/sfs/home')} className="toolbar_logo" aria-label="SFS Blueprints Home">
            <img
              src="https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp"
              alt="SFS Blueprints Logo"
              width="40"
              height="40"
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            &ensp;
            <span className="web_name" style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
              SFS Blueprints
            </span>
          </Link>
        </div>

        <div className="search">
          <form onSubmit={handleSearchSubmit}>
            <button className="search_btn" title="Search" type="submit" aria-label="Search Blueprints">
              <svg width="16" height="16" fill="currentColor" className="as as-search" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
            <input
              type="text"
              name="search"
              aria-label="Search Blueprint"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder="Search Blueprint.........."
            />
          </form>
        </div>

        <div className="signin">
          <Link to={appendUtmToUrl('/upload')} title="Upload" aria-label="Upload New Blueprint">
            <svg width="16" height="16" fill="currentColor" className="as as-upload" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Left Sidebar (from sidebar.html) ────────────────────────── */}
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <ul>
          <li className="home">
            <Link to={appendUtmToUrl('/sfs/home')} title="home">
              <div
                className="sidebar_icons"
                style={isActive('/sfs/home') ? { background: 'var(--purple-901)', borderColor: 'var(--purple-600)' } : {}}
              >
                <svg width="16" height="16" fill="currentColor" className="as as-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                </svg>
                <div className="sidebar_icon_name">Home</div>
              </div>
            </Link>
          </li>

          <li className="blueprints">
            <Link to={appendUtmToUrl('/sfs/blueprints')} title="blueprints">
              <div
                className="sidebar_icons"
                style={
                  isActive('/sfs/blueprints') || isActive('/blueprints')
                    ? { background: 'var(--purple-901)', borderColor: 'var(--purple-600)' }
                    : {}
                }
              >
                <svg width="16" height="16" fill="currentColor" className="as as-cloud-download" viewBox="0 0 16 16">
                  <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                  <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                </svg>
                <div className="sidebar_icon_name">Blueprints</div>
              </div>
            </Link>
          </li>

          <li className="plaandwor">
            <Link to={appendUtmToUrl('/sfs/planets')} title="planets and worlds">
              <div
                className="sidebar_icons"
                style={isActive('/sfs/planets') ? { background: 'var(--purple-901)', borderColor: 'var(--purple-600)' } : {}}
              >
                <svg width="16" height="16" fill="currentColor" className="as as-globe-central-south-asia" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.882 1.731a.48.48 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.7.7 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a1 1 0 0 0-.462-.04 7 7 0 0 1 2.45-2.027m-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.8.8 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.45.45 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282l.04-.001a7.003 7.003 0 0 1-12.658.905Z" />
                </svg>
                <div className="sidebar_icon_name">Planets and worlds</div>
              </div>
            </Link>
          </li>

          <li className="favourites">
            <Link to={appendUtmToUrl('/sfs/favorites')} title="Favorites">
              <div
                className="sidebar_icons"
                style={isActive('/sfs/favorites') ? { background: 'var(--purple-901)', borderColor: 'var(--purple-600)' } : {}}
              >
                <svg width="16" height="16" fill="currentColor" className="as as-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
                <div className="sidebar_icon_name">Favorites</div>
              </div>
            </Link>
          </li>
        </ul>

        {/* Social media icons from social_media.html */}
        <ul className="social_media_icons" style={{ marginTop: 'auto', paddingTop: '2rem', paddingBottom: '1rem' }}>
          <li>
            <a href="https://www.youtube.com/@AshokWorld." target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="YouTube Channel">
              <svg width="18" height="18" fill="currentColor" className="as as-youtube" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook Page">
              <svg width="18" height="18" fill="currentColor" className="as as-facebook" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://telegram.me/s/ashokspaceflightsimulator" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Telegram Community">
              <svg width="18" height="18" fill="currentColor" className="as as-telegram" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.012-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/ascentracoresolutions" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram Profile">
              <svg width="18" height="18" fill="currentColor" className="as as-instagram" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      {/* ── Fixed Breadcrumbs (from sidebar.html & sidebar.css) ──────── */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className={`bread_crumb ${sidebarActive ? 'sidebar-collapsed' : ''}`}>
          <p>
            &gt;&nbsp;
            <Link to="/sfs/home">
              <svg width="16" height="16" fill="currentColor" className="as as-house-door" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>
            </Link>
            {breadcrumbs.map((b, idx) => (
              <span key={idx}>
                &nbsp;&gt;&nbsp;
                {b.to ? <Link to={b.to}>{b.label}</Link> : <span>{b.label}</span>}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* ── Main Content Container (from sidebar.html) ──────────────── */}
      <div
        className={`container ${sidebarActive ? 'sidebar-collapsed' : ''}`}
        style={{ paddingTop: '80px', paddingBottom: '60px' }}
      >
        {children}
      </div>
    </div>
  );
}
