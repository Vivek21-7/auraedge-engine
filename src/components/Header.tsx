/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cloud, Menu, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onStartDeploying: () => void;
}

export default function Header({ onStartDeploying }: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-[#262629] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <Cloud className="w-5 h-5" />
          </div>
          <span className="text-lg font-extrabold font-secondary text-white tracking-tight">
            AuraEdge
          </span>
        </div>

        {/* Navigation Links */}
        <nav id="main-nav" className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold text-zinc-400 hover:text-white transition-all duration-150">
            Features
          </a>
          <a href="#pricing" className="text-sm font-semibold text-zinc-400 hover:text-white transition-all duration-150">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm font-semibold text-zinc-400 hover:text-white transition-all duration-150">
            Customers
          </a>
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> System: Optimal
          </span>
          <button
            id="btn-nav-cta"
            type="button"
            onClick={onStartDeploying}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer"
          >
            Start Deploying
          </button>
          <button
            id="btn-mobile-menu"
            type="button"
            className="p-2 text-zinc-400 hover:text-white md:hidden cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
