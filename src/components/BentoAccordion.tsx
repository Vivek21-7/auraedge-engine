/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TrendingUp,
  Lock,
  Unlock,
  Globe,
  GitBranch,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  Activity,
  Terminal,
  Server
} from 'lucide-react';

interface BentoFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  gridClass: string; // Tailwind grid layout for desktop Bento
  icon: React.ReactNode;
}

export default function BentoAccordion() {
  // Active feature state (Context Lock) - which item is currently being explored
  const [activeFeature, setActiveFeature] = useState<string>('analytics');

  // Interactive configurations for each widget
  // Feature 1: Analytics Timeframe
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'realtime' | 'weekly' | 'monthly'>('realtime');
  
  // Feature 2: Security Toggle
  const [securityLocked, setSecurityLocked] = useState<boolean>(true);
  
  // Feature 3: Selected Region
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'eu'>('us');
  
  // Feature 4: Active Pipeline Step
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  // Features description array
  const features: BentoFeature[] = [
    {
      id: 'analytics',
      title: 'Streaming Analytics',
      tagline: 'Quantum Scale Insights',
      description: 'Observe global transactions with microsecond precision. Filter and categorize data streams in real time.',
      gridClass: 'md:col-span-2 md:row-span-1',
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'security',
      title: 'Security Context Lock',
      tagline: 'Zero-Trust Isolation',
      description: 'Isolate sensitive environment credentials. Mutate encryption keys programmatically without rebuilding.',
      gridClass: 'md:col-span-1 md:row-span-2',
      icon: <Lock className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'edge',
      title: 'Edge Routing Sync',
      tagline: 'Global Low-Latency Node',
      description: 'Replicate static and dynamic headers to 280+ edge locations automatically with zero-latency overhead.',
      gridClass: 'md:col-span-1 md:row-span-1',
      icon: <Globe className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'pipeline',
      title: 'Automated Pipelines',
      tagline: 'Smarter Event-Driven Actions',
      description: 'Connect serverless triggers to custom LLM classification chains and webhooks with a visual debugger.',
      gridClass: 'md:col-span-2 md:row-span-1',
      icon: <GitBranch className="w-5 h-5 text-amber-400" />
    }
  ];

  // Helper values for Edge Sync latency simulation
  const regionsData = {
    us: { name: 'Americas (IAD)', ping: '12ms', load: '31%', status: 'optimal' },
    eu: { name: 'Europe West (FRA)', ping: '24ms', load: '48%', status: 'optimal' }
  };

  // Helper values for Pipeline Steps
  const pipelineSteps = [
    { name: 'Webhook Trigger', desc: 'Secure HTTPS POST ingestion', details: 'POST /v1/ingest' },
    { name: 'LLM Analysis', desc: 'Classify content using server-side Gemini', details: 'gemini-2.5-flash-lite' },
    { name: 'Data Pipeline Dispatch', desc: 'Sync with Firestore or Webhook', details: 'rules-enforced payload' }
  ];

  // Interactive Widgets Renderer
  const renderInteractiveWidget = (id: string) => {
    switch (id) {
      case 'analytics':
        return (
          <div className="flex flex-col h-full justify-between gap-4">
            {/* Widget Header Toggles */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-primary animate-pulse" /> Live Telemetry
              </span>
              <div className="flex bg-bg-dark p-0.5 rounded-lg text-[10px] border border-border">
                {(['realtime', 'weekly', 'monthly'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAnalyticsTimeframe(t);
                    }}
                    className={`px-2.5 py-1 rounded-md font-bold capitalize transition-all duration-150 cursor-pointer ${
                      analyticsTimeframe === t ? 'bg-bg-card text-white border border-border shadow-xs' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Chart SVG */}
            <div className="flex-1 min-h-[140px] flex items-end justify-between relative px-2 pt-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                <div className="border-b border-border w-full h-0" />
                <div className="border-b border-border w-full h-0" />
                <div className="border-b border-border w-full h-0" />
              </div>

              {/* Dynamic Bars based on Timeframe Context Lock */}
              {analyticsTimeframe === 'realtime' && (
                <div className="flex items-end justify-between w-full h-24 gap-1 md:gap-2">
                  <div className="bg-blue-500/20 w-full rounded-t-sm h-[40%] animate-pulse" />
                  <div className="bg-blue-500/30 w-full rounded-t-sm h-[60%]" />
                  <div className="bg-blue-500/40 w-full rounded-t-sm h-[80%] animate-pulse" />
                  <div className="bg-blue-600 w-full rounded-t-sm h-[95%] shadow-md shadow-blue-600/10" />
                  <div className="bg-blue-500/50 w-full rounded-t-sm h-[70%]" />
                  <div className="bg-blue-500/30 w-full rounded-t-sm h-[50%] animate-pulse" />
                  <div className="bg-blue-500/60 w-full rounded-t-sm h-[85%]" />
                  <div className="bg-blue-500/80 w-full rounded-t-sm h-[75%] animate-pulse" />
                </div>
              )}
              {analyticsTimeframe === 'weekly' && (
                <div className="flex items-end justify-between w-full h-24 gap-2">
                  <div className="bg-blue-500/20 w-full rounded-t-sm h-[30%]" />
                  <div className="bg-blue-500/40 w-full rounded-t-sm h-[45%]" />
                  <div className="bg-blue-500/60 w-full rounded-t-sm h-[70%]" />
                  <div className="bg-blue-600 w-full rounded-t-sm h-[85%] shadow-md shadow-blue-600/10" />
                  <div className="bg-blue-500/50 w-full rounded-t-sm h-[65%]" />
                  <div className="bg-blue-500/30 w-full rounded-t-sm h-[40%]" />
                  <div className="bg-blue-500/70 w-full rounded-t-sm h-[80%]" />
                </div>
              )}
              {analyticsTimeframe === 'monthly' && (
                <div className="flex items-end justify-between w-full h-24 gap-3">
                  <div className="bg-blue-500/30 w-full rounded-t-sm h-[50%]" />
                  <div className="bg-blue-500/50 w-full rounded-t-sm h-[75%]" />
                  <div className="bg-blue-600 w-full rounded-t-sm h-[90%] shadow-md shadow-blue-600/10" />
                  <div className="bg-blue-500/40 w-full rounded-t-sm h-[60%]" />
                </div>
              )}
            </div>

            {/* Chart Subtitles */}
            <div className="flex justify-between text-[9px] font-mono text-zinc-500 border-t border-border pt-2">
              <span>Ingestion Rate: 1,429 ev/s</span>
              <span>Pristine Accuracy</span>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="flex flex-col h-full justify-between gap-4">
            {/* Context Lock Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-emerald-500" /> Vault Node
              </span>
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${securityLocked ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[10px] font-mono text-zinc-400 uppercase">{securityLocked ? 'Secured' : 'Exposed'}</span>
              </div>
            </div>

            {/* Simulated Cryptographic Lock */}
            <div className="flex-1 flex flex-col items-center justify-center py-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSecurityLocked(!securityLocked);
                }}
                className={`p-4 rounded-full border transition-all duration-200 shadow-sm cursor-pointer ${
                  securityLocked
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/40'
                    : 'bg-red-950/20 border-red-500/30 text-red-400 hover:bg-red-950/40 animate-bounce'
                }`}
              >
                {securityLocked ? <Lock className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
              </button>

              <p className="text-[10px] font-mono text-zinc-400 mt-3 text-center leading-relaxed">
                {securityLocked 
                  ? 'Key rotation: 256-bit SHA256 context verified. State isolated.' 
                  : 'WARNING: Context locks bypassed. Click lock to re-secure.'}
              </p>
            </div>

            {/* Mock Secrets Board */}
            <div className="bg-bg-dark border border-border rounded-lg p-2.5 text-[9px] font-mono text-zinc-300">
              <div className="flex justify-between text-[8px] text-zinc-500 border-b border-border pb-1 mb-1">
                <span>Key Label</span>
                <span>Isolated Decryption Value</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400">GEMINI_SECRET</span>
                <span>{securityLocked ? '•••••••••••••' : 'ai_9a2fB81cE70'}</span>
              </div>
            </div>
          </div>
        );

      case 'edge':
        return (
          <div className="flex flex-col h-full justify-between gap-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Server className="w-3 h-3 text-primary" /> CDN Proximity
              </span>
              <span className="text-[10px] bg-[#114C5A]/30 border border-[#114C5A]/60 text-primary px-2 py-0.5 rounded-full font-bold">
                280+ Nodes
              </span>
            </div>

            {/* Region Selectors */}
            <div className="grid grid-cols-2 gap-1 bg-bg-dark border border-border p-0.5 rounded-lg text-[10px]">
              {(['us', 'eu'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRegion(r);
                  }}
                  className={`py-1.5 rounded-md font-semibold capitalize transition-all duration-150 cursor-pointer ${
                    selectedRegion === r ? 'bg-bg-card border border-border text-white shadow-xs font-bold' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Live Node Statistics Card */}
            <div className="bg-bg-dark border border-border rounded-xl p-3 flex flex-col justify-between flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-white">{regionsData[selectedRegion].name}</p>
                  <p className="text-[9px] font-mono text-zinc-500">Node Sync: Synced</p>
                </div>
                <span className="text-xs font-extrabold text-primary font-mono">
                  {regionsData[selectedRegion].ping}
                </span>
              </div>

              <div className="h-2 w-full bg-bg-card border border-border rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: regionsData[selectedRegion].load }}
                />
              </div>

              <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 mt-2">
                <span>Bandwidth: {regionsData[selectedRegion].load} capacity</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                </span>
              </div>
            </div>
          </div>
        );

      case 'pipeline':
        return (
          <div className="flex flex-col h-full justify-between gap-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-amber-500" /> Pipeline Debugger
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Click node to inspect</span>
            </div>

            {/* Visual Steps Layout */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-bg-dark border border-border p-2.5 rounded-xl flex-1">
              {pipelineSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPipelineStep(idx);
                    }}
                    className={`flex-1 w-full text-left p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      pipelineStep === idx
                        ? 'bg-bg-card border-amber-500/50 shadow-xs'
                        : 'bg-bg-card/40 border-border hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500">Step 0{idx + 1}</span>
                      {pipelineStep === idx && <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />}
                    </div>
                    <p className="text-[10px] font-bold text-white leading-tight truncate mt-0.5">{step.name}</p>
                    <p className="text-[8px] text-zinc-400 truncate leading-none mt-0.5">{step.desc}</p>
                  </button>
                  {idx < 2 && (
                    <span className="text-zinc-600 text-xs font-bold leading-none select-none rotate-90 md:rotate-0">
                      ➔
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step Console Detail */}
            <div className="bg-bg-dark border border-border rounded-lg p-2.5 text-[9px] font-mono text-amber-400">
              <div className="flex justify-between text-zinc-500 border-b border-border pb-1 mb-1 text-[8px]">
                <span>Pipeline Log Console</span>
                <span>Status: OK</span>
              </div>
              <p className="text-zinc-300">
                &gt; Executing {pipelineSteps[pipelineStep].name}...
              </p>
              <p className="text-amber-400">
                &gt; Params: {pipelineSteps[pipelineStep].details}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-24 px-6 bg-bg-dark border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#114C5A]/30 border border-[#114C5A]/60 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FFC801] tracking-wider uppercase mb-4 animate-fade-in">
            <Zap className="w-3.5 h-3.5 text-primary" />
            Feature Showcase
          </div>
          <h2 id="features-heading" className="text-4xl md:text-5xl font-extrabold font-secondary tracking-tight text-white mb-4">
            Interactive Bento Dashboard
          </h2>
          <p className="text-lg text-zinc-400">
            Explore our advanced full-stack systems. Click on any card below to "lock context" and test real-time simulated parameters inside each module.
          </p>
        </div>

        {/* 
          1. DESKTOP VIEW: BENTO GRID 
          Shows up only on medium screens and larger.
        */}
        <div id="bento-grid-desktop" className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feat) => {
            const isSelected = activeFeature === feat.id;
            return (
              <div
                key={feat.id}
                id={`bento-card-${feat.id}`}
                onClick={() => setActiveFeature(feat.id)}
                className={`group flex flex-col justify-between bg-bg-card rounded-3xl border p-8 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg ${feat.gridClass} ${
                  isSelected
                    ? 'highlight-card border-blue-500 shadow-md ring-4 ring-blue-500/10'
                    : 'border-border hover:border-zinc-700 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Text Content */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-bg-dark border border-border rounded-xl">
                      {feat.icon}
                    </div>
                    <span className="text-xs font-bold text-zinc-500 font-mono tracking-wider uppercase">
                      {feat.tagline}
                    </span>
                  </div>
                  <h3 id={`bento-title-${feat.id}`} className="text-xl font-extrabold font-secondary text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                    {feat.description}
                  </p>
                </div>

                {/* Rich Interactive Widget Area */}
                <div className="bg-bg-card border border-border p-5 rounded-2xl shadow-inner min-h-[220px]">
                  {renderInteractiveWidget(feat.id)}
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          2. MOBILE VIEW: ACCORDION 
          Visible only on small screens. Automatically converts Bento cells into expandable rows.
        */}
        <div id="accordion-mobile" className="block md:hidden space-y-4 max-w-xl mx-auto">
          {features.map((feat) => {
            const isExpanded = activeFeature === feat.id;
            return (
              <div
                key={feat.id}
                id={`accordion-item-${feat.id}`}
                className={`bg-bg-card rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'highlight-card border-blue-500 shadow-md' : 'border-border'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  id={`accordion-trigger-${feat.id}`}
                  onClick={() => setActiveFeature(isExpanded ? '' : feat.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-all duration-200 hover:bg-[#1f3745]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-bg-dark border border-border rounded-xl shrink-0">
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-secondary text-white">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono">
                        {feat.tagline}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-zinc-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                  )}
                </button>

                {/* Collapsible Content Grid */}
                <div
                  id={`accordion-collapse-${feat.id}`}
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isExpanded ? '500px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                    borderTop: isExpanded ? '1px solid var(--color-border)' : 'none'
                  }}
                >
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {feat.description}
                    </p>
                    {/* Embedded interactive widget inside mobile accordion cell */}
                    <div className="bg-bg-card border border-border p-4 rounded-xl shadow-xs min-h-[200px]">
                      {renderInteractiveWidget(feat.id)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
