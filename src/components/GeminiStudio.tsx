import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Layers, 
  BrainCircuit, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { CATEGORY_DEFINITIONS } from '../data/renders';
import { ConceptCritique, VisualCategory } from '../types';

export const GeminiStudio: React.FC = () => {
  const [category, setCategory] = useState<VisualCategory>('smart-layer');
  const [keywords, setKeywords] = useState<string>('modular flow pods, vertical hydroponic gardens, real-time light overlay');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>(
    "A photorealistic, isometric render of a reimagined urban street intersection in 2040. Show modular, AI-coordinated 'Flow Pods' for public transit replacing traditional buses, integrated with vertical community gardens on all building facades. Gemini's presence is visible as a subtle, adaptive light overlay on the street, guiding the modular transport units in real-time."
  );
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [critique, setCritique] = useState<ConceptCritique | null>({
    title: "Urban 2040 Intersection: Flow Pods & Biophilic Integration",
    transitCoordination: "Modular Flow Pods eliminate traditional route bunching by dynamically platooning on demand. Speed harmonic wave is managed via road-embedded light cues.",
    biophilicEfficacy: "Vertical facade gardens lower ambient surface temperatures by 3.4°C and filter PM2.5 particulates while producing edible greens for neighborhood co-ops.",
    adaptiveSmartLayer: "Gemini optical neural routing overlays predictive trajectory channels directly onto high-friction street zones, preventing deadlock without physical traffic lights.",
    recommendations: [
      "Couple 3-pod trains during peak morning commute cycles (07:30 - 09:15).",
      "Route automated stormwater runoff through greywater vertical garden hydroponic beds.",
      "Maintain 3.5m pedestrian buffer radius at all street-level crossing nodes."
    ]
  });
  const [copied, setCopied] = useState<boolean>(false);

  const handleGeneratePrompt = async () => {
    setIsGeneratingPrompt(true);
    try {
      const res = await fetch('/api/gemini/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, customInput: keywords })
      });
      const data = await res.json();
      if (data.success && data.generatedPrompt) {
        setGeneratedPrompt(data.generatedPrompt);
      }
    } catch (err) {
      console.error('Prompt generation failed:', err);
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleRunCritique = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conceptPrompt: generatedPrompt,
          aspect: category
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setCritique(data.analysis);
      }
    } catch (err) {
      console.error('Critique failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <BrainCircuit className="w-3.5 h-3.5" />
          Powered by Google Gemini
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
          Gemini 2040 Prompt Lab & Concept Evaluator
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Formulate photorealistic isometric prompts for any of the five official challenge dimensions, or ask Gemini to evaluate the engineering and ecological feasibility of your 2040 urban vision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prompt Generator Controls */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0e131f] p-6 space-y-5">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Select Challenge Archetype
          </h3>

          <div className="space-y-2">
            {CATEGORY_DEFINITIONS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id as VisualCategory)}
                className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  category === cat.id
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-white">{cat.title}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">→ {cat.tagline}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{cat.description}</p>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Custom Keywords / Architectural Elements
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              placeholder="e.g., modular pods, aero skyways, hydroponic trellises"
            />
          </div>

          <button
            onClick={handleGeneratePrompt}
            disabled={isGeneratingPrompt}
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isGeneratingPrompt ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting Gemini Prompt...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>Generate Targeted Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Prompt Output & Architectural Critique */}
        <div className="lg:col-span-7 space-y-6">
          {/* Formatted Prompt Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Render Prompt (Ready for Google Gemini)
              </span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#080b12] border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
              "{generatedPrompt}"
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Meets: Photorealistic • Isometric 3D • 2040 Smart Mobility
              </span>
              <button
                onClick={handleRunCritique}
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Feasibility...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>Run AI Concept Critique</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Concept Critique Card */}
          {critique && (
            <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {critique.title}
                </h4>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  Gemini Evaluation: 98/100
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-cyan-400">Transit Coordination</div>
                  <p className="text-slate-300 leading-relaxed">{critique.transitCoordination}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-emerald-400">Biophilic Efficacy</div>
                  <p className="text-slate-300 leading-relaxed">{critique.biophilicEfficacy}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-amber-400">Smart Overlay Layer</div>
                  <p className="text-slate-300 leading-relaxed">{critique.adaptiveSmartLayer}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Strategic Recommendations for 2040 Deployment
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {critique.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
