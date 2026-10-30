import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Shield, Lock, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Ascentracore Solutions"
        description="Learn how Ascentracore Solutions collects, uses, and safeguards your personal data, code snippets, and usage information across our cloud platforms and developer tools."
        canonicalUrl="/privacy-policy"
      />

      <div className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 text-emerald-400 mb-4">
            <Shield className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wider uppercase">Legal & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-lg text-slate-300">
            Last updated: October 2026. Effective for all users, clients, and visitors of Ascentracore Solutions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert prose-emerald max-w-none text-slate-300 space-y-8 leading-relaxed">
          <section className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" /> 1. Commitment to Data Privacy
            </h2>
            <p>
              Ascentracore Solutions Private Limited ("Ascentracore", "we", "our", or "us") is dedicated to upholding 
              the privacy rights of every individual who interacts with our digital products, developer platforms 
              (including SkilTrix CodeLab, SFS Blueprints, SonicOra), enterprise consulting services, and educational tutorials. 
              This document clarifies what data we collect, why we need it, and how your privacy is protected under applicable 
              data protection standards including the Digital Personal Data Protection Act (DPDPA) and GDPR principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              We collect information in three ways: information you provide directly, automated technical diagnostics, 
              and usage logs generated when you run developer tools.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Account Registration:</strong> Name, professional email address, organization name, and authentication tokens (via our Central Accounts SSO).
              </li>
              <li>
                <strong className="text-white">Code Execution & Submissions:</strong> Code snippets, compiler standard output, test run logs, and diagnostic benchmarks submitted within CodeLab or assessment modules.
              </li>
              <li>
                <strong className="text-white">Commercial & Consultation Inquiries:</strong> Contact details, project specifications, architectural preferences, and budget indications submitted through our contact or quote forms.
              </li>
              <li>
                <strong className="text-white">Technical Logs:</strong> Browser user agent, IP address, device fingerprints, operating system specifications, and cookie preferences used strictly for security monitoring and session integrity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Data</h2>
            <p className="mb-3">We process data solely for explicit, lawful purposes:</p>
            <div className="grid sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-white mb-1">Service Delivery</h3>
                <p className="text-sm text-slate-400">Executing sandbox code, provisioning enterprise cloud environments, and compiling execution benchmarks.</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-white mb-1">Assessment Integrity</h3>
                <p className="text-sm text-slate-400">Validating candidate mock submissions, calculating benchmark scorecards, and issuing verifiable completion certificates.</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-white mb-1">Security & Abuse Prevention</h3>
                <p className="text-sm text-slate-400">Preventing sandbox escapes, DDoS attempts, brute force logins, and unauthorized scraping of proprietary coursework.</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-white mb-1">Communication</h3>
                <p className="text-sm text-slate-400">Delivering critical service status updates, account verification tokens, security advisories, and customer service answers.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Cookies and Advertising Technologies</h2>
            <p className="mb-3">
              We deploy essential cookies necessary for authentication sessions, anti-CSRF protection, and dark/light mode preferences. 
              On our public editorial pages (such as technology tutorials, engineering articles, and free documentation guides), 
              we may partner with reputable third-party advertising networks (such as Google AdSense).
            </p>
            <p className="mb-3">
              Third-party vendors, including Google, use cookies to serve ads based on prior visits to this website or other websites. 
              Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or 
              other sites on the Internet.
            </p>
            <div className="p-4 bg-emerald-950/30 border border-emerald-800/50 rounded-lg text-emerald-200 text-sm">
              <strong>Your Choice:</strong> You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-white">
                Google Ads Settings
              </a>{' '}
              or by opting out of a third-party vendor's use of cookies for personalized advertising through{' '}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-white">
                aboutads.info
              </a>.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Data Retention & Sandboxed Code</h2>
            <p>
              Code submitted to the SkilTrix runtime is executed inside isolated ephemeral Docker/gVisor sandboxes. 
              Temporary execution files are deleted immediately after execution completes. Assessment submissions are 
              retained in your candidate profile history until account deletion is requested.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. User Rights and Data Rectification</h2>
            <p>You have full ownership of your personal data. You may at any time:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Request an export copy of all stored personal profile information.</li>
              <li>Request rectification of incorrect or outdated biographical details.</li>
              <li>Request full account and associated submission deletion ("Right to be Forgotten").</li>
              <li>Withdraw consent for optional communications and promotional digests.</li>
            </ul>
          </section>

          <section className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 mt-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-400" /> Contact Our Privacy Office
            </h2>
            <p className="text-sm text-slate-300">
              For any privacy inquiries, GDPR/DPDPA data access requests, or security disclosures, contact our designated Data Protection Officer:
            </p>
            <div className="mt-3 text-sm">
              <p className="font-semibold text-white">Ascentracore Solutions Private Limited</p>
              <p className="text-slate-400">Email: <a href="mailto:privacy@ascentracoresolutions.com" className="text-emerald-400 hover:underline">privacy@ascentracoresolutions.com</a></p>
              <p className="text-slate-400">Postal Address: Technology Park, Hitech City, Hyderabad, Telangana 500081, India</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
