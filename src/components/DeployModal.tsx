import React, { useState, useEffect, useRef } from 'react';
import { X, Server, Shield, Globe, Terminal, Play, CheckCircle, RefreshCw, Cpu, Database } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TemplateId = 'api' | 'static' | 'gemini';

interface Template {
  id: TemplateId;
  name: string;
  desc: string;
  icon: React.ReactNode;
  size: string;
}

export default function DeployModal({ isOpen, onClose }: DeployModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('api');
  const [selectedRegion, setSelectedRegion] = useState<'global' | 'us' | 'eu' | 'ap'>('global');
  const [isDeploying, setIsDeploying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deploySpeed, setDeploySpeed] = useState<number>(0);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const templates: Template[] = [
    {
      id: 'api',
      name: 'Serverless Edge API',
      desc: 'High-performance API router proxy with lazy SDK configurations.',
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      size: '1.2 MB'
    },
    {
      id: 'static',
      name: 'Dynamic Firestore Caching',
      desc: 'Cache Firestore query pipelines across 280+ CDN locations.',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      size: '850 KB'
    },
    {
      id: 'gemini',
      name: 'Gemini AI Pipe Trigger',
      desc: 'Secure AI server-side proxy route with model parameter lock.',
      icon: <Terminal className="w-5 h-5 text-amber-400" />,
      size: '2.4 MB'
    }
  ];

  const deploymentSteps = [
    { title: 'Bundling project artifacts', cmd: 'esbuild server.ts --bundle --platform=node' },
    { title: 'Provisioning multi-region instances', cmd: 'auraedge container create --regions=all' },
    { title: 'Configuring secure vault environment', cmd: 'vault secret sync --project=AuraEdge' },
    { title: 'Propagating HTTP/3 TLS certificates', cmd: 'dnsSEC cert challenge --domain=edge.local' },
    { title: 'Running global health verification', cmd: 'ping gateway-matrix --verify=pristine' }
  ];

  // Auto-scroll terminal
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

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

  if (!isOpen) return null;

  const startDeployment = () => {
    setIsDeploying(true);
    setCurrentStep(0);
    setIsSuccess(false);
    setLogs([`[AuraEdge CLI v4.1] Initializing deployment for template: "${templates.find(t => t.id === selectedTemplate)?.name}"`]);

    let stepIndex = 0;
    
    const runStep = () => {
      if (stepIndex >= deploymentSteps.length) {
        setLogs(prev => [
          ...prev,
          `\n[SUCCESS] Server successfully deployed and active in all selected 280+ nodes.`,
          `Live Edge Endpoint: https://${selectedTemplate}-node.auraedge.app`,
          `Average ping delay across Europe, Asia-Pac, and Americas: 3.82 ms`,
          `Pristine security certification verified.`
        ]);
        setIsSuccess(true);
        setIsDeploying(false);
        return;
      }

      const step = deploymentSteps[stepIndex];
      setCurrentStep(stepIndex);
      
      setLogs(prev => [
        ...prev,
        `\n> Running: ${step.cmd}`,
        `[INFO] ${step.title}...`
      ]);

      // Add detailed simulated log outputs for each step
      setTimeout(() => {
        if (stepIndex === 0) {
          setLogs(prev => [...prev, '✓ Bundled: 16 core files, 1,492 lines compiled cleanly into self-contained ESM chunk.']);
        } else if (stepIndex === 1) {
          setLogs(prev => [...prev, `✓ Node targets synced: global gateway routes configured (${selectedRegion.toUpperCase()}).`, '✓ Active edge endpoints scaling up instantly.']);
        } else if (stepIndex === 2) {
          setLogs(prev => [...prev, '✓ Environment variables securely locked. Vault rotation active (SHA256 authenticated).']);
        } else if (stepIndex === 3) {
          setLogs(prev => [...prev, '✓ SSL handshake propagated to secondary clusters. DNSSEC verified.']);
        } else if (stepIndex === 4) {
          setLogs(prev => [...prev, '✓ 280 regions report "OPTIMAL" status. Active ping time: 4.14ms.']);
        }

        stepIndex++;
        setTimeout(runStep, 1000);
      }, 800);
    };

    runStep();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div className="bg-[#161618] border border-[#262629] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262629] bg-[#161618]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg text-white">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-secondary text-white">Global Edge Deployment</h2>
              <p className="text-xs text-zinc-500 font-mono">v4.1 High-Performance Pipeline</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#262629] rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isDeploying && !isSuccess ? (
            <>
              {/* Template selection */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                  Select Project Template
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-500/5 shadow-md shadow-blue-500/5'
                          : 'border-[#262629] bg-[#0A0A0B]/40 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="p-2 bg-[#0A0A0B] border border-[#262629] rounded-lg">
                          {template.icon}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{template.size}</span>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-xs font-bold text-white leading-tight">{template.name}</h4>
                        <p className="text-[10px] text-zinc-400 leading-normal mt-1 line-clamp-2">
                          {template.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Region Select */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                  Global Routing Strategy
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#0A0A0B] border border-[#262629] p-1 rounded-xl">
                  {([
                    { id: 'global', name: 'Global Proxy (280+ nodes)' },
                    { id: 'us', name: 'Americas Hub' },
                    { id: 'eu', name: 'Euro Gateway' },
                    { id: 'ap', name: 'Asia Pacific Grid' }
                  ] as const).map(region => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold font-secondary transition-all duration-150 cursor-pointer ${
                        selectedRegion === region.id
                          ? 'bg-[#161618] border border-[#262629] text-white shadow-sm'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs Panel */}
              <div className="bg-[#0A0A0B] border border-[#262629] rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <p className="text-zinc-400 font-mono">Build Isolation Engine</p>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> WebAssembly V8 Sandboxing
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-zinc-400 font-mono">Bypass DNS Latency</p>
                  <p className="font-bold text-blue-400 font-mono">~3.8ms worldwide</p>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={startDeployment}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/10 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Trigger Global Deployment
              </button>
            </>
          ) : (
            <div className="space-y-6">
              {/* Dynamic steps pipeline list */}
              <div className="space-y-3">
                {deploymentSteps.map((step, idx) => {
                  const isActive = isDeploying && currentStep === idx;
                  const isCompleted = currentStep > idx || isSuccess;
                  
                  return (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                        isActive 
                          ? 'border-blue-500/50 bg-blue-500/5' 
                          : isCompleted 
                            ? 'border-emerald-500/20 bg-emerald-500/2' 
                            : 'border-[#262629] opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg border ${
                          isActive 
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                            : isCompleted 
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                              : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className={`w-4 h-4 ${isActive ? 'animate-spin' : ''}`} />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{step.title}</p>
                          <p className="text-[9px] font-mono text-zinc-500">{step.cmd}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {isCompleted ? 'Completed' : isActive ? 'Processing...' : 'Queued'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Real-time Scrolling Console Output */}
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Console Output Stream
                </label>
                <div className="bg-[#0A0A0B] border border-[#262629] rounded-xl p-4 h-48 overflow-y-auto font-mono text-[10px] text-zinc-300 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
                  {logs.map((log, index) => {
                    const isCmd = log.startsWith('>');
                    const isErr = log.includes('WARNING');
                    const isSuccessLog = log.includes('[SUCCESS]') || log.startsWith('✓');
                    
                    return (
                      <div 
                        key={index} 
                        className={
                          isCmd 
                            ? 'text-blue-400 font-bold' 
                            : isErr 
                              ? 'text-red-400' 
                              : isSuccessLog 
                                ? 'text-emerald-400 font-bold' 
                                : 'text-zinc-300'
                        }
                      >
                        {log}
                      </div>
                    );
                  })}
                  <div ref={consoleEndRef} />
                </div>
              </div>

              {/* Actions on complete */}
              {isSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 text-center space-y-4 animate-fade-in">
                  <div className="mx-auto bg-emerald-500 text-white p-3 rounded-full w-fit">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Edge Deployment Succeeded!</h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                      Your high-performance container has been initialized and synced across 280+ proxy gateways instantly.
                    </p>
                  </div>
                  <div className="flex gap-2 max-w-sm mx-auto">
                    <a
                      href={`https://${selectedTemplate}-node.auraedge.app`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1F1F22] border border-[#2D2D31] hover:bg-[#262629] text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Visit Edge Site
                    </a>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setIsDeploying(false);
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Deploy Another Template
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
