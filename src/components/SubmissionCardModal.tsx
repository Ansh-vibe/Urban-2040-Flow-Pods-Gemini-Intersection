import React from 'react';
import { X, CheckCircle2, Download, Printer, Sparkles, ShieldCheck } from 'lucide-react';
import { RenderItem } from '../types';

interface SubmissionCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  renderItem: RenderItem;
}

export const SubmissionCardModal: React.FC<SubmissionCardModalProps> = ({
  isOpen,
  onClose,
  renderItem
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = renderItem.imageSrc;
    link.download = `Gemini_2040_Submission_${renderItem.id}.${renderItem.fileFormat.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-[#0e131f] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 print:border-none print:bg-white print:text-black print:shadow-none">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 print:border-gray-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-bold uppercase tracking-wider print:border-black print:text-black">
                Official Submission Dossier
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold print:text-green-700">
                <CheckCircle2 className="w-4 h-4" />
                100% Gemini Compliant
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white print:text-black">
              {renderItem.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-600">
              {renderItem.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Render Preview */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-black/60 print:border-gray-300">
          <img
            src={renderItem.imageSrc}
            alt={renderItem.title}
            referrerPolicy="no-referrer"
            className="w-full max-h-96 object-contain"
          />
        </div>

        {/* Verification Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-200 print:bg-gray-50">
            <div className="text-slate-400 print:text-gray-500">Creation Engine</div>
            <div className="font-bold text-cyan-300 print:text-black mt-0.5">Google Gemini ONLY</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-200 print:bg-gray-50">
            <div className="text-slate-400 print:text-gray-500">File Format</div>
            <div className="font-bold text-cyan-300 print:text-black mt-0.5">{renderItem.fileFormat} (Standard)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-200 print:bg-gray-50">
            <div className="text-slate-400 print:text-gray-500">File Size</div>
            <div className="font-bold text-cyan-300 print:text-black mt-0.5">{renderItem.approxSizeMb} MB / 10 MB Max</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-200 print:bg-gray-50">
            <div className="text-slate-400 print:text-gray-500">Visual Archetype</div>
            <div className="font-bold text-cyan-300 print:text-black mt-0.5">{renderItem.categoryLabel.split('&')[0]}</div>
          </div>
        </div>

        {/* Architectural Concept Manifesto */}
        <div className="space-y-2 text-xs sm:text-sm">
          <h4 className="font-display font-bold text-white print:text-black text-sm">
            Urban Transformation Concept
          </h4>
          <p className="text-slate-300 print:text-gray-700 leading-relaxed">
            {renderItem.conceptDescription}
          </p>
        </div>

        {/* Exact Gemini Prompt */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-300 print:text-black">
            Prompt Used:
          </div>
          <div className="p-3.5 rounded-xl bg-[#080b12] border border-slate-800 font-mono text-xs text-slate-300 print:border-gray-300 print:bg-gray-50 print:text-black leading-relaxed">
            "{renderItem.prompt}"
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 print:hidden">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Ready for official challenge upload</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              Download {renderItem.fileFormat} File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
