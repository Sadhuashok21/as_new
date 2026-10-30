import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ExternalLink,
  Terminal,
} from "lucide-react";

function getGlobalSignInUrl() {
  const isLocal = typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const defaultAccountsUrl = isLocal ? "http://localhost:5174" : "https://accounts.ascentracoresolutions.com";
  const accountsUrl = (import.meta.env.VITE_ACCOUNTS_URL || defaultAccountsUrl).replace(/\/+$/, "");
  return `${accountsUrl}/login?next=${encodeURIComponent(window.location.href)}`;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg shadow-slate-950/20 border-b border-slate-800/80"
          : "bg-slate-950 border-b border-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center p-0.5 bg-blue-600/10 border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
              <img
                src="https://cdn.ascentracoresolutions.com/ascentra.webp"
                alt="Ascentracore Solutions"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center">
              <span className="text-blue-500">Ascentracore</span>
              <span className="text-slate-200 ml-1">Solutions</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/search"
              aria-label="Search articles and resources"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>

            <a
              href="https://skiltrix.ascentracoresolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
              title="Launch SkilTrix Developer Coding Suite"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>SkilTrix</span>
              <ExternalLink className="w-3 h-3 text-blue-400/70" />
            </a>

            <a
              href={getGlobalSignInUrl()}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors"
            >
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/search"
              className="p-2 text-slate-400 hover:text-white rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="https://skiltrix.ascentracoresolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-blue-300 bg-blue-950/40 border border-blue-900/50"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                SkilTrix Coding Platform
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={getGlobalSignInUrl()}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Sign In to Account
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export { Navbar };

