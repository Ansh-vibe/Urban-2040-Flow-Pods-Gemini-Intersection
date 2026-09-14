import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  AlertCircle, 
  FileCheck, 
  Sparkles, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { UploadedSubmission, VisualCategory } from '../types';
import { CATEGORY_DEFINITIONS } from '../data/renders';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubmission: (submission: UploadedSubmission) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddSubmission
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('2040 Flow Pods & Biophilic Intersection');
  const [category, setCategory] = useState<VisualCategory>('smart-layer');
  const [description, setDescription] = useState<string>(
    'Photorealistic isometric render showing modular Flow Pods, vertical community gardens on facades, and Gemini adaptive light overlays.'
  );
  const [promptUsed, setPromptUsed] = useState<string>(
    "A photorealistic, isometric render of a reimagined urban street intersection in 2040. Show modular, AI-coordinated 'Flow Pods' for public transit replacing traditional buses, integrated with vertical community gardens on all building facades. Gemini's presence is visible as a subtle, adaptive light overlay on the street, guiding the modular transport units in real-time."
  );
  const [createdWithGeminiOnly, setCreatedWithGeminiOnly] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateAndSetFile = (selectedFile: File) => {
    setErrorMessage(null);

    // Format validation: JPG or PNG only
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage('Invalid file format. Only JPG or PNG are accepted.');
      return;
    }

    // Size validation: Max 10 MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      setErrorMessage(`File is too large (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB). Max file size is 10 MB.`);
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!createdWithGeminiOnly) {
      setErrorMessage('You must confirm that this visual was created using Google Gemini ONLY.');
      return;
    }

    if (!previewUrl) {
      setErrorMessage('Please upload a visual file (JPG or PNG, max 10 MB).');
      return;
    }

    const newSubmission: UploadedSubmission = {
      id: `sub-${Date.now()}`,
      fileName: file ? file.name : 'gemini_visual_submission.jpg',
      fileSize: file ? file.size : 3.8 * 1024 * 1024,
      fileType: file ? file.type : 'image/jpeg',
      previewUrl: previewUrl,
      title: title || 'Reimagined Urban 2040 Concept',
      category: category,
      description: description,
      promptUsed: promptUsed,
      createdWithGemini: true,
      uploadedAt: new Date().toLocaleDateString()
    };

    onAddSubmission(newSubmission);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0e131f] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 space-y-6 my-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                Upload Your Gemini Visual ✦
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Submit your AI-rendered 2040 city vision under official challenge requirements.
            </p>
          </div>

          <button
            id="btn-close-upload-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Requirements Checklist Bar */}
        <div className="p-3.5 rounded-xl bg-[#080b12] border border-slate-800/80 space-y-2 text-xs">
          <div className="font-semibold text-slate-300">Mandatory Submission Rules:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Must be created using Google Gemini ONLY</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Accepted formats: JPG or PNG</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Max file size: 10 MB</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Should visually show reimagined city element</span>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag & Drop File Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
              isDragging
                ? 'border-cyan-400 bg-cyan-500/10'
                : previewUrl
                ? 'border-emerald-500/50 bg-emerald-950/20'
                : 'border-slate-700 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-600'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl ? (
              <div className="flex flex-col items-center gap-3 w-full">
                <img
                  src={previewUrl}
                  alt="Visual Preview"
                  referrerPolicy="no-referrer"
                  className="max-h-48 rounded-lg object-contain border border-slate-700 shadow-md"
                />
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                  <FileCheck className="w-4 h-4" />
                  <span>{file ? file.name : 'Visual loaded'}</span>
                  {file && (
                    <span className="font-mono text-slate-400">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB / 10 MB)
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 underline">
                  Click or drag to replace image
                </span>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Drag and drop your Gemini render here, or browse
                </div>
                <p className="text-xs text-slate-400">
                  JPG or PNG • Maximum 10 MB
                </p>
              </div>
            )}
          </div>

          {/* City Element Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              What kind of visual is this? 💭
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CATEGORY_DEFINITIONS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as VisualCategory)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    category === cat.id
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-white">{cat.title}</div>
                  <div className="text-[11px] text-cyan-400/80">{cat.tagline}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Concept Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              placeholder="e.g., 2040 Flow Pods & Biophilic Intersection"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Google Gemini Prompt Used
            </label>
            <textarea
              rows={3}
              value={promptUsed}
              onChange={(e) => setPromptUsed(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
              placeholder="Enter the prompt used in Google Gemini"
            />
          </div>

          {/* Mandatory Checkbox */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="confirm-gemini"
              checked={createdWithGeminiOnly}
              onChange={(e) => setCreatedWithGeminiOnly(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="confirm-gemini" className="text-xs text-slate-300 cursor-pointer select-none">
              <strong className="text-cyan-300">✅ Verification:</strong> I confirm this visual was created using <strong>Google Gemini ONLY</strong> and is compliant with the 10 MB limit in JPG or PNG format.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
            >
              Submit Visual ✦
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
