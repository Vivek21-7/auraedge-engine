/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cloud, Github, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="app-footer" className="bg-[#0A0A0B] text-zinc-400 py-16 px-6 border-t border-[#262629]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <Cloud className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold font-secondary tracking-tight">
              AuraEdge
            </span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Unifying multi-region compute pipelines under a seamless latency-free proxy system. Designed with precision, secured by default.
          </p>
          <div className="flex items-center gap-3 text-zinc-500">
            <a href="#" className="hover:text-white transition-colors duration-150">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors duration-150">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors duration-150">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links column 1 */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Product</p>
          <ul className="space-y-2 text-xs">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Matrix</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Enterprise SLA</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Global Core Map</a></li>
          </ul>
        </div>

        {/* Links column 2 */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Resources</p>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Edge Sync Guides</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Systems Security</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API References</a></li>
          </ul>
        </div>

        {/* Links column 3 */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Legal</p>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security Disclosures</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>

      <div className="h-px bg-[#262629] my-10 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-zinc-500">
        <p>© 2026 AuraEdge Technologies Inc. All rights reserved.</p>
        <p className="flex items-center gap-1.5 mt-4 md:mt-0">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active Region: Global Proxy Gateway (UTC-7)
        </p>
      </div>
    </footer>
  );
}
