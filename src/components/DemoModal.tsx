import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RefreshCw, Zap, Server, Activity, ArrowRight, Sparkles } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScenarioId = 'cache' | 'compute' | 'ai';

interface Scenario {
  id: ScenarioId;
  name: string;
  tagline: string;
  desc: string;
  avgMs: number;
  cacheHitRate: string;
  codeSnippet: string;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('cache');
  const [requestCount, setRequestCount] = useState<number>(250);
  const [isSimulating, setIsSimulating] = useState(false);
  const [metrics, setMetrics] = useState({
    latency: 0,
    hitRate: 0,
    successRate: 100
  });
  const [simulatedLogs, setSimulatedLogs] = useState<{ id: string; method: string; route: string; region: string; latency: number; status: number }[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const scenarios: Scenario[] = [
    {
      id: 'cache',
      name: 'Firestore CDN Cache Proxy',
      tagline: 'Instant global caching layer',
      desc: 'Bypasses Firestore read limits by proxying key-value document snapshots to regional CDN instances.',
      avgMs: 1.8,
      cacheHitRate: '99.4%',
      codeSnippet: `import { getAuraEdge } from "auraedge";\n\n// Instantly caches Firestore documents under high-speed edge nodes\nexport async function getCachedUsers() {\n  const edge = getAuraEdge();\n  return await edge.cache("users_list", async () => {\n    return await db.collection("users").get();\n  }, { ttl: 300 });\n}`
    },
    {
      id: 'compute',
      name: 'Edge Serverless Compute',
      tagline: 'Distributed isolated runtime nodes',
      desc: 'Executes Node / TypeScript logic right at the serverless cluster closest to the customer.',
      avgMs: 3.5,
      cacheHitRate: 'N/A',
      codeSnippet: `import { NextRequest, NextResponse } from "next/server";\n\n// Compute pipeline executes in closest regional center in <4ms\nexport async function middleware(req: NextRequest) {\n  const region = req.headers.get("x-auraedge-region") || "global";\n  return NextResponse.json({\n    routed_node: region,\n    timestamp: Date.now()\n  });\n}`
    },
    {
      id: 'ai',
      name: 'Gemini AI Pipeline Trigger',
      tagline: 'Smarter event-driven parsing',
      desc: 'Triggers multi-region LLM classification chains on server-side requests with hidden key security.',
      avgMs: 8.4,
      cacheHitRate: '88.1%',
      codeSnippet: `import { GoogleGenAI } from "@google/genai";\n\n// Handles server-side intelligence flows with model context locks\nexport async function POST(req: Request) {\n  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n  const response = await ai.models.generateContent({\n    model: 'gemini-2.5-flash',\n    contents: 'Categorize logs: ' + await req.text(),\n  });\n  return Response.json({ category: response.text });\n}`
    }
  ];

  const regionsList = ['Seattle', 'London', 'Tokyo', 'Singapore', 'Frankfurt', 'Mumbai', 'Sydney', 'New York'];

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Initial random chart data
  useEffect(() => {
    if (isOpen) {
      resetSimulation();
    }
  }, [isOpen, activeScenario]);

  // Auto-scroll simulated logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [simulatedLogs]);

  if (!isOpen) return null;

  const resetSimulation = () => {
    const baseVal = scenarios.find(s => s.id === activeScenario)?.avgMs || 2.5;
    const initialChart = Array.from({ length: 15 }, () => baseVal + (Math.random() * 2 - 1));
    setChartData(initialChart);
    setMetrics({
      latency: baseVal,
      hitRate: activeScenario === 'compute' ? 0 : parseFloat(scenarios.find(s => s.id === activeScenario)?.cacheHitRate || '90'),
      successRate: 100
    });
    setSimulatedLogs([]);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulatedLogs([]);
    let currentReq = 0;
    
    const targetScenario = scenarios.find(s => s.id === activeScenario)!;
    const baseMs = targetScenario.avgMs;

    const interval = setInterval(() => {
      if (currentReq >= 20) {
        clearInterval(interval);
        setIsSimulating(false);
        return;
      }

      // Generate random simulated request details
      const randomRegion = regionsList[Math.floor(Math.random() * regionsList.length)];
      const randomLatency = parseFloat((baseMs + (Math.random() * 4 - 2)).toFixed(2));
      const methods = ['GET', 'POST', 'PUT'];
      const randomMethod = methods[Math.floor(Math.random() * methods.length)];
      const routes = ['/api/v1/auth', '/api/v1/cache', '/api/v1/insights', '/api/v1/pipeline'];
      const randomRoute = routes[Math.floor(Math.random() * routes.length)];
      const randomStatus = Math.random() > 0.02 ? 200 : 500;

      const newLog = {
        id: Math.random().toString(36).substring(2, 7),
        method: randomMethod,
        route: randomRoute,
        region: randomRegion,
        latency: randomLatency,
        status: randomStatus
      };

      setSimulatedLogs(prev => [...prev, newLog]);
      
      // Dynamic metric updating
      setMetrics(prev => {
        const errorCount = simulatedLogs.filter(l => l.status === 500).length + (randomStatus === 500 ? 1 : 0);
        const total = currentReq + 1;
        return {
          latency: parseFloat(((prev.latency * 4 + randomLatency) / 5).toFixed(2)),
          hitRate: activeScenario === 'compute' ? 0 : parseFloat((85 + Math.random() * 14).toFixed(1)),
          successRate: parseFloat(((total - errorCount) / total * 100).toFixed(1))
        };
      });

      // Update dynamic live chart point
      setChartData(prev => {
        const next = [...prev.slice(1), randomLatency];
        return next;
      });

      currentReq++;
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main dialog box */}
      <div className="bg-[#161618] border border-[#262629] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262629]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg text-white animate-pulse">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-secondary text-white">AuraEdge Live Simulator Playground</h2>
              <p className="text-xs text-zinc-500 font-mono">Observe regional telemetry routing on milliseconds scale</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#262629] rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Splitting */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#262629]">
          
          {/* Left Column: Interactive Scenario Control & Code snippet */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                Select Interactive Scenario
              </label>

              {scenarios.map(scenario => (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setActiveScenario(scenario.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                    activeScenario === scenario.id
                      ? 'border-blue-500 bg-blue-500/5 shadow-sm'
                      : 'border-[#262629] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{scenario.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Avg: {scenario.avgMs}ms</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1 leading-normal">
                    {scenario.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Static high contrast code preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Developer Integration Snippet</span>
                <span className="flex items-center gap-1 text-blue-400">
                  <Sparkles className="w-3 h-3" /> Auto-optimizing
                </span>
              </div>
              <div className="bg-[#0A0A0B] border border-[#262629] rounded-xl p-3 h-44 overflow-y-auto font-mono text-[10px] text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
                <pre>{scenarios.find(s => s.id === activeScenario)?.codeSnippet}</pre>
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry & Graph charts */}
          <div className="md:col-span-7 p-6 flex flex-col space-y-6 bg-[#0A0A0B]/40">
            
            {/* Live Metrics Header row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#161618] border border-[#262629] rounded-xl p-3 space-y-1 text-center">
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Average Latency</p>
                <p className="text-xl font-bold text-blue-400 font-mono tracking-tight">
                  {metrics.latency.toFixed(2)} ms
                </p>
              </div>
              <div className="bg-[#161618] border border-[#262629] rounded-xl p-3 space-y-1 text-center">
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Cache Hit Rate</p>
                <p className="text-xl font-bold text-emerald-400 font-mono tracking-tight">
                  {activeScenario === 'compute' ? 'N/A' : `${metrics.hitRate.toFixed(1)}%`}
                </p>
              </div>
              <div className="bg-[#161618] border border-[#262629] rounded-xl p-3 space-y-1 text-center">
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Security State</p>
                <p className="text-xl font-bold text-amber-400 font-mono tracking-tight">
                  {metrics.successRate.toFixed(0)}% OK
                </p>
              </div>
            </div>

            {/* Dynamic Latency Line Graph SVG */}
            <div className="bg-[#0A0A0B] border border-[#262629] rounded-2xl p-4 flex flex-col h-44 justify-between relative">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Real-Time Processing Delay Monitor</span>
                <span>Active Core Cluster</span>
              </div>

              {/* Simulated Waveform / Grid lines */}
              <div className="flex-1 flex items-end h-28 relative pt-4">
                <div className="absolute inset-x-0 top-1/4 border-b border-[#262629]/50 h-0" />
                <div className="absolute inset-x-0 top-2/4 border-b border-[#262629]/50 h-0" />
                <div className="absolute inset-x-0 top-3/4 border-b border-[#262629]/50 h-0" />
                
                {/* SVG path mapping */}
                <svg className="w-full h-full absolute inset-0 text-blue-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    points={chartData
                      .map((val, idx) => {
                        const maxVal = Math.max(...chartData, 10);
                        const x = (idx / (chartData.length - 1)) * 100;
                        const y = 100 - (val / maxVal) * 80;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    className="transition-all duration-300"
                  />
                </svg>

                {/* Ping latency node points */}
                <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 text-[8px] font-mono text-zinc-500">
                  <span>-15s</span>
                  <span>-10s</span>
                  <span>-5s</span>
                  <span>Now</span>
                </div>
              </div>
            </div>

            {/* Live Streaming terminal logs */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                Distributed Proxy Routing Console
              </label>
              <div 
                ref={logsContainerRef}
                className="bg-[#0A0A0B] border border-[#262629] rounded-xl p-3 h-32 overflow-y-auto font-mono text-[10px] text-zinc-300 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800"
              >
                {simulatedLogs.length === 0 ? (
                  <div className="text-zinc-500 italic text-center py-8">
                    Ready to receive simulated live traffic. Hit "Simulate Global Traffic" below.
                  </div>
                ) : (
                  simulatedLogs.map((log) => (
                    <div key={log.id} className="flex justify-between items-center hover:bg-zinc-900/50 p-1 rounded">
                      <span className="text-blue-400">[{log.method}]</span>
                      <span className="text-zinc-400 truncate max-w-[140px] md:max-w-[180px]">{log.route}</span>
                      <span className="text-zinc-500 font-bold">{log.region}</span>
                      <span className={log.latency < 4 ? 'text-emerald-400' : 'text-amber-400'}>
                        {log.latency}ms
                      </span>
                      <span className={log.status === 200 ? 'text-emerald-500 bg-emerald-500/10 px-1 rounded' : 'text-red-500 bg-red-500/10 px-1 rounded'}>
                        {log.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Simulated Live trigger action row */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs shadow-md cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                {isSimulating ? 'Simulating requests...' : 'Simulate Global Traffic (1,000 reqs)'}
              </button>
              <button
                type="button"
                onClick={resetSimulation}
                className="bg-[#1F1F22] border border-[#2D2D31] hover:bg-[#262629] text-zinc-300 font-bold p-3 rounded-xl transition-colors cursor-pointer"
                title="Reset simulation parameters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
