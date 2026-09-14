import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Download, 
  Copy, 
  Check, 
  Info, 
  Sparkles, 
  MapPin, 
  Layers, 
  ShieldCheck,
  Eye,
  Sliders
} from 'lucide-react';
import { RenderItem, Hotspot } from '../types';

interface RenderViewerProps {
  renders: RenderItem[];
  currentRender: RenderItem;
  onSelectRender: (render: RenderItem) => void;
  onOpenUpload: () => void;
  onOpenSubmissionCard: () => void;
}

export const RenderViewer: React.FC<RenderViewerProps> = ({
  renders,
  currentRender,
  onSelectRender,
  onOpenUpload,
  onOpenSubmissionCard
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    currentRender.hotspots[0] || null
  );
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullScreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false)).catch(() => {});
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentRender.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentRender.imageSrc;
    link.download = `${currentRender.id}-gemini-2040.${currentRender.fileFormat.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Requirements & Submission Status */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-emerald-950/30 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                Gemini Official Visual Generated
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                {currentRender.fileFormat} • {currentRender.approxSizeMb} MB (Max 10 MB)
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
                Aspect {currentRender.aspectRatio}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              {currentRender.title}
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {currentRender.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-view-card"
              onClick={onOpenSubmissionCard}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Info className="w-4 h-4 text-cyan-400" />
              Submission Card
            </button>
            <button
              id="btn-download-hero"
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              Download {currentRender.fileFormat} ({currentRender.approxSizeMb} MB)
            </button>
          </div>
        </div>

        {/* Requirements Checklist Pills */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Created via Google Gemini</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Format: {currentRender.fileFormat} (JPG/PNG)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Size: {currentRender.approxSizeMb} MB &lt; 10 MB limit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Photorealistic 2040 Isometric</span>
          </div>
        </div>
      </div>

      {/* Angle / View Selection Switcher */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {renders.map((r) => {
            const isSelected = r.id === currentRender.id;
            return (
              <button
                key={r.id}
                id={`switch-render-${r.id}`}
                onClick={() => {
                  onSelectRender(r);
                  setSelectedHotspot(r.hotspots[0] || null);
                  setZoomLevel(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                <span>{r.title.split(':')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                  {r.timeOfDay}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Options Toggle */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-hotspots"
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
              showHotspots
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Hotspots {showHotspots ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div 
        ref={containerRef}
        className={`relative rounded-2xl overflow-hidden border border-slate-800 bg-[#070a10] shadow-2xl transition-all ${
          isFullScreen ? 'p-4 flex flex-col justify-center items-center' : ''
        }`}
      >
        {/* Floating Toolbar Controls */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-lg text-slate-300">
          <button
            id="btn-zoom-in"
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-all text-slate-300 hover:text-white"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="btn-zoom-out"
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-all text-slate-300 hover:text-white"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            id="btn-zoom-reset"
            onClick={handleResetZoom}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-all text-slate-300 hover:text-white text-xs font-mono px-2"
            title="Reset Zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <div className="w-[1px] h-4 bg-slate-700 mx-0.5" />
          <button
            id="btn-fullscreen"
            onClick={toggleFullScreen}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-all text-slate-300 hover:text-white"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Top-Right Badge: Category Archetype */}
        <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2">
          <div className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800 text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{currentRender.categoryLabel}</span>
          </div>
        </div>

        {/* Canvas / Image Wrapper with Pan/Zoom capability */}
        <div className="relative w-full max-h-[75vh] min-h-[420px] sm:min-h-[540px] flex items-center justify-center overflow-auto p-2">
          <div 
            className="relative transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <img
              src={currentRender.imageSrc}
              alt={currentRender.title}
              referrerPolicy="no-referrer"
              className="w-full max-w-5xl h-auto rounded-xl object-contain shadow-2xl select-none"
            />

            {/* Interactive Hotspot Pins */}
            {showHotspots &&
              currentRender.hotspots.map((hotspot) => {
                const isActive = selectedHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    id={`hotspot-${hotspot.id}`}
                    onClick={() => setSelectedHotspot(hotspot)}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                  >
                    {/* Pulsing ring */}
                    <span className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                      isActive ? 'bg-cyan-400' : 'bg-amber-400'
                    }`} />
                    {/* Pin Circle */}
                    <span className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-lg border-2 transition-transform duration-200 group-hover:scale-125 ${
                      isActive
                        ? 'bg-cyan-500 border-white text-slate-950 scale-110 ring-4 ring-cyan-500/40'
                        : 'bg-slate-950/90 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-slate-950'
                    }`}>
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    {/* Mini Label badge on hover */}
                    <span className="absolute left-1/2 -translate-x-1/2 top-8 px-2 py-0.5 bg-slate-950/90 text-white text-[11px] font-semibold rounded shadow-md border border-slate-800 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {hotspot.title}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Bottom Floating Hotspot Detail Drawer */}
        {showHotspots && selectedHotspot && (
          <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                    {selectedHotspot.tag}
                  </span>
                  <h3 className="font-display font-bold text-base text-white">
                    {selectedHotspot.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {selectedHotspot.description}
                </p>
              </div>

              {/* Metric Card */}
              <div className="shrink-0 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">
                    {selectedHotspot.statLabel}
                  </div>
                  <div className="font-display font-bold text-sm text-cyan-300">
                    {selectedHotspot.statValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prompt Specification & Generation Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exact Gemini Prompt Box */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-[#0e131f] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="font-display font-semibold text-sm text-white">
                Official Google Gemini Generation Prompt
              </h4>
            </div>
            <button
              id="btn-copy-prompt"
              onClick={handleCopyPrompt}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080b12] border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed select-all">
            "{currentRender.prompt}"
          </div>

          <p className="text-xs text-slate-400">
            {currentRender.conceptDescription}
          </p>
        </div>

        {/* Technical Architecture Specs */}
        <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            <h4 className="font-display font-semibold text-sm text-white">
              2040 Engineering Telemetry
            </h4>
          </div>

          <div className="space-y-2.5 text-xs">
            {currentRender.technicalSpecs.map((spec, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">{spec.label}</span>
                <span className="font-semibold text-slate-200 font-mono text-right">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={onOpenUpload}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 transition-all text-center cursor-pointer"
            >
              Submit Alternative Visual ✦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
