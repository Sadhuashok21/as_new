import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center p-0.5 bg-blue-600/10 border border-blue-500/20">
                <img
                  src="https://cdn.ascentracoresolutions.com/ascentra.webp"
                  alt="Ascentracore Solutions"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <span className="font-bold text-lg text-white">
                <span className="text-blue-500">Ascentracore</span>
                <span className="text-slate-200 ml-1">Solutions</span>
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Ascentracore Solutions is a modern technology and software engineering company. We engineer custom enterprise web systems, scalable backend architectures, developer compilers, and high-value technical learning platforms.
            </p>

            <div className="space-y-1.5 text-slate-400 text-xs pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href="mailto:contact@ascentracoresolutions.com" className="hover:text-white transition-colors">
                  contact@ascentracoresolutions.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+91 6305096514</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Solutions & Services */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Engineering Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/custom-software-development" className="hover:text-white transition-colors">
                  Custom Software Dev
                </Link>
              </li>
              <li>
                <Link to="/services/web-application-engineering" className="hover:text-white transition-colors">
                  Web Application Engineering
                </Link>
              </li>
              <li>
                <Link to="/services/backend-api-architecture" className="hover:text-white transition-colors">
                  Backend & API Systems
                </Link>
              </li>
              <li>
                <Link to="/services/cloud-deployment-devops" className="hover:text-white transition-colors">
                  Cloud Infrastructure & DevOps
                </Link>
              </li>
              <li>
                <Link to="/services/developer-tools-platforms" className="hover:text-white transition-colors">
                  Developer Tools & Compilers
                </Link>
              </li>
              <li>
                <Link to="/services/educational-technology" className="hover:text-white transition-colors">
                  EdTech & Coding Platforms
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Resources & Tutorials */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Tutorials & Guides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tutorials/python" className="hover:text-white transition-colors">
                  Python Programming
                </Link>
              </li>
              <li>
                <Link to="/tutorials/java" className="hover:text-white transition-colors">
                  Java & Collections
                </Link>
              </li>
              <li>
                <Link to="/tutorials/django" className="hover:text-white transition-colors">
                  Django REST Framework
                </Link>
              </li>
              <li>
                <Link to="/tutorials/dsa" className="hover:text-white transition-colors">
                  Data Structures & Algorithms
                </Link>
              </li>
              <li>
                <Link to="/tutorials/linux" className="hover:text-white transition-colors">
                  Linux Administration
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Cheat Sheets & Roadmaps
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Legal */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Products & Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://skiltrix.ascentracoresolutions.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  SkilTrix Coding Suite
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link to="/sfs" className="hover:text-white transition-colors">
                  SFS Blueprints
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="/admin" className="hover:text-white transition-colors">
                  Admin Panel
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Ascentracore Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
            <Link to="/resources" className="hover:text-slate-400 transition-colors">
              Developer Resources
            </Link>
            <a href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

