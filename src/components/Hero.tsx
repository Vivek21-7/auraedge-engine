/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Play, Server, Zap } from 'lucide-react';

interface HeroProps {
  onStartDeploying: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onStartDeploying, onWatchDemo }: HeroProps) {
  return (
    <section id="hero" className="py-20 md:py-32 px-6 bg-bg-dark overflow-hidden relative border-b border-border">
      {/* Background radial gradient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[25%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute top-[15%] right-[20%] w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 bg-[#114C5A]/30 text-[#FFC801] border border-[#114C5A]/60 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 animate-fade-in shadow-xs">
          <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
          AURAEDGE v4.1 NOW LIVE
        </div>

        {/* Hero Title */}
        <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold font-secondary tracking-tight text-white max-w-4xl mx-auto leading-none mb-6">
          The global edge engine for modern teams
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Deploy serverless nodes in 280+ regions in milliseconds. Scale your Firestore, custom SQL, or Gemini-powered apps without thinking about database locks or latency spikes.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={onStartDeploying}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm"
          >
            Start Deploying Free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onWatchDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-bg-card border border-border hover:bg-[#1c3340] text-zinc-300 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-sm cursor-pointer text-sm"
          >
            <Play className="w-4 h-4 fill-current text-zinc-400" />
            Watch 2-Min Live Demo
          </button>
        </div>

        {/* Mockup Dashboard Preview */}
        <div id="hero-mockup" className="max-w-5xl mx-auto bg-bg-card rounded-3xl p-3 shadow-2xl border border-border relative group">
          {/* Neon border glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-accent/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          
          <div className="bg-bg-dark rounded-2xl border border-border overflow-hidden text-left shadow-inner">
            {/* Window bar */}
            <div className="bg-bg-card px-5 py-3.5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[11px] font-mono text-zinc-500 bg-bg-dark px-4 py-1 rounded-md border border-border">
                admin.auraedge.network/deployments
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                <span className="text-[10px] font-mono text-emerald-400">Connected</span>
              </div>
            </div>

            {/* Mock Layout Grid */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1 */}
              <div className="bg-bg-card border border-border p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Active Pipelines</span>
                  <Server className="w-4 h-4 text-primary" />
                </div>
                <p className="text-3xl font-bold text-white tracking-tight font-secondary">249,812</p>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  ▲ +14.2% from last hour
                </p>
              </div>

              {/* Box 2 */}
              <div className="bg-bg-card border border-border p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Average Ping Delay</span>
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <p className="text-3xl font-bold text-white tracking-tight font-secondary">4.21 ms</p>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  ▼ -2.1ms routing optimizers active
                </p>
              </div>

              {/* Box 3 */}
              <div className="bg-bg-card border border-border p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Global SSL Coverage</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <p className="text-3xl font-bold text-white tracking-tight font-secondary">100.00%</p>
                <p className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  Secure DNSSEC & isolated headers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
