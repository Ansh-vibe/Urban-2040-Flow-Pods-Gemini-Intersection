export type VisualCategory =
  | 'redesigned-space'
  | 'system-service'
  | 'structure-render'
  | 'smart-layer'
  | 'experience';

export interface Hotspot {
  id: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  title: string;
  tag: string;
  description: string;
  statLabel: string;
  statValue: string;
}

export interface RenderItem {
  id: string;
  title: string;
  subtitle: string;
  category: VisualCategory;
  categoryLabel: string;
  imageSrc: string;
  aspectRatio: string;
  fileFormat: 'JPG' | 'PNG';
  approxSizeMb: number;
  timeOfDay: 'Day / Golden Hour' | 'Night / Neural Glow' | 'Midday / Detail';
  prompt: string;
  conceptDescription: string;
  hotspots: Hotspot[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
}

export interface UploadedSubmission {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  previewUrl: string;
  title: string;
  category: VisualCategory;
  description: string;
  promptUsed: string;
  createdWithGemini: boolean;
  uploadedAt: string;
}

export interface ConceptCritique {
  title: string;
  transitCoordination: string;
  biophilicEfficacy: string;
  adaptiveSmartLayer: string;
  recommendations: string[];
}
