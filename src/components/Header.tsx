import React from 'react';
import { Sparkles, Upload, Download, Eye, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenUpload: () => void;
  onOpenStudio: () => void;
  onDownloadCurrent: () => void;
  activeTab: 'showcase' | 'deepdive' | 'studio' | 'gallery';
  setActiveTab: (tab: 'showcase' | 'deepdive' | 'studio' | 'gallery') => void;
  submissionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUpload,
  onOpenStudio,
  onDownloadCurrent,
  activeTab,
  setActiveTab,
  submissionCount
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-tight text-white">URBAN 2040</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
                Gemini Visual
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Flow Pods • Living Facades • Adaptive Light Grid
            </p>
          </div>
        </div>

        {/* View Navigation */}
        <nav className="hidden md:flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            id="nav-showcase"
            onClick={() => setActiveTab('showcase')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'showcase'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Isometric Render
          </button>
          <button
            id="nav-deepdive"
            onClick={() => setActiveTab('deepdive')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'deepdive'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            System Architecture
          </button>
          <button
            id="nav-studio"
            onClick={() => setActiveTab('studio')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'studio'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Gemini Prompt Lab
          </button>
          {submissionCount > 0 && (
            <button
              id="nav-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Uploads ({submissionCount})
            </button>
          )}
        </nav>

        {/* Primary CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="btn-download-render"
            onClick={onDownloadCurrent}
            className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Download high-resolution image file for submission"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Download</span> Visual
          </button>

          <button
            id="btn-upload-visual"
            onClick={onOpenUpload}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span>Upload Your Visual ✦</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex border-t border-slate-800/60 bg-[#0c101a] px-2 py-1.5 justify-around text-xs">
        <button
          onClick={() => setActiveTab('showcase')}
          className={`py-1 px-2.5 rounded-lg ${activeTab === 'showcase' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          Render
        </button>
        <button
          onClick={() => setActiveTab('deepdive')}
          className={`py-1 px-2.5 rounded-lg ${activeTab === 'deepdive' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          Architecture
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`py-1 px-2.5 rounded-lg ${activeTab === 'studio' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          Prompt Lab
        </button>
        {submissionCount > 0 && (
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-1 px-2.5 rounded-lg ${activeTab === 'gallery' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
          >
            Uploads ({submissionCount})
          </button>
        )}
      </div>
    </header>
  );
};
