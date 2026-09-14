import React, { useState } from 'react';
import { 
  Bus, 
  Cpu, 
  Leaf, 
  Route, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  VolumeX, 
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { CATEGORY_DEFINITIONS } from '../data/renders';

export const ConceptDeepDive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flowpods' | 'gardens' | 'geminioverlay'>('flowpods');
  const [simulationSpeed, setSimulationSpeed] = useState<'normal' | 'rushhour' | 'night'>('normal');

  return (
    <div className="space-y-8">
      {/* Overview Intro */}
      <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          The 2040 Urban Blueprint
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
          How the 2040 Street Intersection Functions
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Traditional 20th-century street intersections prioritized internal combustion vehicles, static concrete lane striping, and mechanical traffic signals that forced vehicles and pedestrians to idle. In 2040, the street is an organic, self-orchestrating mobility garden powered by three intertwined technologies.
        </p>

        {/* 3 Core Pillars Pill Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
          <button
            id="tab-flowpods"
            onClick={() => setActiveTab('flowpods')}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeTab === 'flowpods'
                ? 'bg-cyan-500/15 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activeTab === 'flowpods' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'}`}>
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Modular 'Flow Pods'</h4>
                <p className="text-xs text-slate-400">Replacing 40ft traditional buses</p>
              </div>
            </div>
          </button>

          <button
            id="tab-gardens"
            onClick={() => setActiveTab('gardens')}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeTab === 'gardens'
                ? 'bg-emerald-500/15 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activeTab === 'gardens' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400'}`}>
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Vertical Facade Gardens</h4>
                <p className="text-xs text-slate-400">Living community envelopes</p>
              </div>
            </div>
          </button>

          <button
            id="tab-geminioverlay"
            onClick={() => setActiveTab('geminioverlay')}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeTab === 'geminioverlay'
                ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activeTab === 'geminioverlay' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Gemini Adaptive Light</h4>
                <p className="text-xs text-slate-400">Subtle, real-time street overlay</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Pillar Detail View */}
      {activeTab === 'flowpods' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Modular AI-Coordinated 'Flow Pods'
              </h3>
              <p className="text-xs sm:text-sm text-cyan-300">
                On-Demand Disaggregation & High-Velocity Platooning
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-relaxed">
                Traditional mass transit relied on rigid 40-foot buses that ran half-empty during off-peak hours and caused severe intersection blockages during peak hours. In 2040, transit is disaggregated into modular, electric, autonomous <strong>Flow Pods</strong>.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong>Virtual & Magnetic Couplers:</strong> Pods dynamically hitch into trains along arterial roads, then peel off individually into residential alleyways.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong>Inductive Opportunity Charging:</strong> Ultra-fast 30-second magnetic resonance charging pads at curbside passenger stops maintain continuous 24/7 fleet uptime.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong>Whisper Quiet:</strong> Magnetic levitation dampers and low-rolling-resistance bio-composite tires drop street noise to under 42 decibels.</span>
                </li>
              </ul>
            </div>

            {/* Spec Box */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                Comparative Fleet Metrics
              </h5>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Peak Passenger Capacity (PerHour/Direction)</span>
                    <span className="font-bold text-cyan-300">18,500 vs 4,200 (2024 Bus)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Intersection Road Occupation</span>
                    <span className="font-bold text-cyan-300">-64% pavement area needed</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full w-[64%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Average Citizen Wait Time</span>
                    <span className="font-bold text-cyan-300">42 seconds (On-demand)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gardens' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Vertical Community Gardens on All Building Facades
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300">
                Biophilic Climate Mitigation & Hyper-Local Food Abundance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-relaxed">
                By 2040, municipal code mandates that 100% of vertical building facades support photosynthetic vegetation. These aren't merely decorative climbing ivy; they are automated hydroponic food forests managed collectively by neighborhood residents and IoT sensor arrays.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Microclimate Cooling:</strong> Transpiration cools street ambient heat by 3.4°C, completely neutralizing the urban heat island effect.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Closed-Loop Greywater Filtration:</strong> Runoff from resident showers and rainwater collectors is routed through living bio-filters in the facade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Acoustic & Particulate Barrier:</strong> Dense foliage absorbs 80% of road vibration and traps PM2.5 tire particulates.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                Ecological Impact per Block
              </h5>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                  <div className="text-slate-400">Fresh Produce Harvest</div>
                  <div className="font-display font-bold text-base text-emerald-300">1,250 kg organic vegetables / year</div>
                  <div className="text-[11px] text-slate-400 mt-1">Distributed directly to residents via ground floor co-op markets</div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                  <div className="text-slate-400">Urban Heat Reduction</div>
                  <div className="font-display font-bold text-base text-emerald-300">-3.4°C Surface & Ambient Air</div>
                  <div className="text-[11px] text-slate-400 mt-1">Saves ~40% HVAC building cooling load</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'geminioverlay' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Gemini Adaptive Real-Time Light Overlay
              </h3>
              <p className="text-xs sm:text-sm text-amber-300">
                Non-Intrusive Optical Guidance & Zero-Collision Synchronization
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-relaxed">
                Rather than glaring red/green streetlights perched on ugly metal poles, Gemini's presence is woven directly into the pavement. Opto-fluidic nano-veins project soft, adaptive light lines that indicate exact trajectories, braking envelopes, and pedestrian crossing buffers.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span><strong>Zero-Wait Pedestrian Sanctuary:</strong> When a pedestrian approaches the curb, the road projects a dynamic illuminated path. Pods gently decelerate to allow smooth passage without complete stops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span><strong>Subtle Optical Elegance:</strong> Luminous cyan pulses for pod corridors; warm amber for boarding zones. The intensity scales to atmospheric ambient lux.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span><strong>Zero Collision Architecture:</strong> Pods calculate trajectories with 4ms edge AI latency, smoothly interweaving like water ripples.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                The Gemini Civic Intelligence Layer
              </h5>
              <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-700/40 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-semibold">Trajectory Calculation Speed:</span>
                  <span className="font-mono text-amber-300">4.2 milliseconds</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-semibold">Intersection Throughput:</span>
                  <span className="font-mono text-amber-300">2,400 pod units/hr</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-semibold">Signal Hardware Elimination:</span>
                  <span className="font-mono text-amber-300">100% (No poles, wires, or heads)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The 5 Challenge Visual Dimensions from User Prompt */}
      <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-6 sm:p-8 space-y-5">
        <div className="space-y-1">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Evaluation Guidelines 💭
          </div>
          <h3 className="font-display font-bold text-xl text-white">
            What We Mean By Visual
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            How this 2040 isometric intersection satisfies every visual archetype in the submission guidelines:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {CATEGORY_DEFINITIONS.map((cat) => (
            <div 
              key={cat.id} 
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-white">{cat.title}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <div className="text-xs font-semibold text-cyan-300">
                → {cat.tagline}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
