import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { AlertTriangle, Scale } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service | Ascentracore Solutions"
        description="Review the terms and conditions governing the use of Ascentracore Solutions digital products, educational compilers, developer platforms, and engineering consulting services."
        canonicalUrl="/terms"
      />

      <div className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 text-emerald-400 mb-4">
            <Scale className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wider uppercase">Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-lg text-slate-300">
            Effective as of October 2026. Please read these terms carefully before accessing Ascentracore services or running code on our infrastructure.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert prose-emerald max-w-none text-slate-300 space-y-8 leading-relaxed">
          <section className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, registering for, or using websites, subdomains, software products 
              (including SkilTrix CodeLab, SFS Blueprints, SonicOra), API services, or educational content operated by 
              Ascentracore Solutions Private Limited ("Ascentracore", "we", "us"), you agree to be bound by these Terms of Service. 
              If you do not agree with any provision here, you must terminate access immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Acceptable Use of Sandboxes & Compilers</h2>
            <p className="mb-3">
              Ascentracore provides high-performance cloud compilation and code execution environments (e.g., SkilTrix CodeLab). 
              You strictly agree NOT to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Execute malicious software, trojans, ransomware, or fork-bombs designed to degrade host infrastructure.</li>
              <li>Attempt container escapes, kernel exploits, unauthorized lateral network scanning, or port scanning.</li>
              <li>Engage in cryptocurrency mining, unauthorized automated bot operations, or denial-of-service stress testing without written authorization.</li>
              <li>Circumvent execution resource limits (CPU cycles, memory caps, memory limits, or time boundaries).</li>
            </ul>
            <div className="mt-4 p-4 bg-rose-950/30 border border-rose-800/40 rounded-lg text-rose-200 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>
                Violations of sandbox security policies result in immediate account termination, IP-level firewall blacklisting, and reporting to relevant cyber authorities where applicable.
              </span>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Intellectual Property Rights</h2>
            <p className="mb-3">
              <strong className="text-white">Our Content:</strong> All software code, UI designs, system architectures, blueprints, 
              curated course curricula, assessment questions, documentation articles, and trademarks are the exclusive proprietary property 
              of Ascentracore Solutions or its respective licensors.
            </p>
            <p>
              <strong className="text-white">Your Submissions:</strong> You retain ownership of any proprietary code algorithms you create 
              and write into our editors. By submitting code into public community forums or assessments, you grant Ascentracore a non-exclusive 
              license to execute, analyze, compile, and benchmark your code solely for assessment verification and platform scoring purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Disclaimer Regarding Company Mock Assessments</h2>
            <p>
              Assessments provided on our educational platforms (such as "Amazon-style SDE Mock", "Deloitte-style Placement Mock", 
              "Accenture-style Coding Mock") are independent educational practice modules crafted by Ascentracore's curriculum team. 
              They are NOT official assessments and are NOT affiliated with, sponsored by, or endorsed by any aforementioned companies. 
              Passing any mock test does not guarantee employment or interview invitations with any external entity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Service Availability & SLA</h2>
            <p>
              While we strive for 99.9% uptime across production clusters, Ascentracore provides all free community tools, tutorials, 
              and public articles on an "AS-IS" and "AS-AVAILABLE" basis without warranties of any kind. Enterprise consulting and dedicated 
              enterprise hosting plans are governed by separate Master Services Agreements (MSAs) containing explicit Service Level Agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. 
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
            </p>
          </section>

          <section className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2">Questions Regarding Terms?</h2>
            <p className="text-sm text-slate-300">
              For commercial licensing inquiries, enterprise terms negotiation, or copyright questions, contact:
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Email: <a href="mailto:legal@ascentracoresolutions.com" className="text-emerald-400 hover:underline">legal@ascentracoresolutions.com</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
