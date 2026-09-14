/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RenderViewer } from './components/RenderViewer';
import { ConceptDeepDive } from './components/ConceptDeepDive';
import { GeminiStudio } from './components/GeminiStudio';
import { SubmissionGallery } from './components/SubmissionGallery';
import { UploadModal } from './components/UploadModal';
import { SubmissionCardModal } from './components/SubmissionCardModal';
import { INITIAL_RENDERS } from './data/renders';
import { RenderItem, UploadedSubmission } from './types';
import { Sparkles, ShieldCheck, Download, ArrowRight, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'showcase' | 'deepdive' | 'studio' | 'gallery'>('showcase');
  const [renders, setRenders] = useState<RenderItem[]>(INITIAL_RENDERS);
  const [currentRender, setCurrentRender] = useState<RenderItem>(INITIAL_RENDERS[0]);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Submissions state
  const [submissions, setSubmissions] = useState<UploadedSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('gemini_2040_submissions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'sub-seed-1',
        fileName: 'urban_intersection_2040_master.jpg',
        fileSize: 3.8 * 1024 * 1024,
        fileType: 'image/jpeg',
        previewUrl: INITIAL_RENDERS[0].imageSrc,
        title: 'Master Isometric Intersection: Flow Pods & Living Facades',
        category: 'smart-layer',
        description: 'Photorealistic isometric render of 2040 street intersection with modular Flow Pods, vertical community gardens, and Gemini adaptive light overlays.',
        promptUsed: INITIAL_RENDERS[0].prompt,
        createdWithGemini: true,
        uploadedAt: 'Today'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('gemini_2040_submissions', JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddSubmission = (newSub: UploadedSubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
    showToast('Visual successfully uploaded & validated with Gemini criteria!');
    setActiveTab('gallery');
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    showToast('Submission removed from local cache.');
  };

  const handleDownloadCurrent = () => {
    const link = document.createElement('a');
    link.href = currentRender.imageSrc;
    link.download = `${currentRender.id}.${currentRender.fileFormat.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading ${currentRender.fileFormat} (${currentRender.approxSizeMb} MB)...`);
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow-2xl animate-fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenStudio={() => setActiveTab('studio')}
        onDownloadCurrent={handleDownloadCurrent}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        submissionCount={submissions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'showcase' && (
          <RenderViewer
            renders={renders}
            currentRender={currentRender}
            onSelectRender={(r) => setCurrentRender(r)}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenSubmissionCard={() => setIsCardOpen(true)}
          />
        )}

        {activeTab === 'deepdive' && <ConceptDeepDive />}

        {activeTab === 'studio' && <GeminiStudio />}

        {activeTab === 'gallery' && (
          <SubmissionGallery
            submissions={submissions}
            onDeleteSubmission={handleDeleteSubmission}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddSubmission={handleAddSubmission}
      />

      <SubmissionCardModal
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
        renderItem={currentRender}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#06080d] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">Urban 2040: Flow Pods & Living Facades</span>
            <span>•</span>
            <span>Created with Google Gemini</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>JPG / PNG Format Compliant</span>
            <span>•</span>
            <span>Max 10 MB Verified</span>
            <span>•</span>
            <span>Isometric 2040 Render</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
