import React from 'react';
import { UploadedSubmission } from '../types';
import { Download, CheckCircle2, Trash2, Calendar, FileText, Sparkles } from 'lucide-react';

interface SubmissionGalleryProps {
  submissions: UploadedSubmission[];
  onDeleteSubmission: (id: string) => void;
  onOpenUpload: () => void;
}

export const SubmissionGallery: React.FC<SubmissionGalleryProps> = ({
  submissions,
  onDeleteSubmission,
  onOpenUpload
}) => {
  if (submissions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-[#0e131f] p-12 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-lg text-white">No Uploaded Submissions Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Upload your Google Gemini 2040 visual (JPG or PNG, up to 10 MB) to keep track of your candidate renders.
        </p>
        <button
          onClick={onOpenUpload}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          Upload Your Visual ✦
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white">
            Your Uploaded Gemini Visuals ({submissions.length})
          </h2>
          <p className="text-xs text-slate-400">
            Compliant candidate renders created using Google Gemini
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
        >
          + Upload Another Visual
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((sub) => {
          const sizeMb = (sub.fileSize / (1024 * 1024)).toFixed(2);
          return (
            <div
              key={sub.id}
              className="rounded-2xl border border-slate-800 bg-[#0e131f] overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div className="relative aspect-video bg-black/60 overflow-hidden">
                <img
                  src={sub.previewUrl}
                  alt={sub.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-emerald-300 border border-emerald-500/40">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Gemini Verified</span>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-cyan-300 font-mono border border-slate-800">
                  {sizeMb} MB
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                    {sub.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {sub.uploadedAt}
                    </span>
                    <span className="capitalize text-cyan-400 font-medium">
                      {sub.category.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href={sub.previewUrl}
                      download={sub.fileName}
                      className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      Download
                    </a>
                    <button
                      onClick={() => onDeleteSubmission(sub.id)}
                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/80 text-slate-400 hover:text-rose-300 transition-all cursor-pointer"
                      title="Delete submission"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
