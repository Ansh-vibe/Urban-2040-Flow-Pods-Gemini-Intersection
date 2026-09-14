import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy Gemini client
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Analyze concept or generate design critique using Gemini
app.post("/api/gemini/analyze-concept", async (req, res) => {
  try {
    const { conceptPrompt, aspect, imageBase64 } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback with rich default architectural assessment if key is not configured
      return res.json({
        success: true,
        analysis: {
          title: "Urban 2040 Intersection: Flow Pods & Biophilic Integration",
          transitCoordination: "Modular Flow Pods eliminate traditional route bunching by dynamically platooning on demand. Speed harmonic wave is managed via road-embedded light cues.",
          biophilicEfficacy: "Vertical facade gardens lower ambient surface temperatures by 3.2°C and filter PM2.5 particulates while producing edible greens for neighborhood co-ops.",
          adaptiveSmartLayer: "Gemini optical neural routing overlays predictive trajectory channels directly onto high-friction street zones, preventing deadlock without physical traffic lights.",
          recommendations: [
            "Couple 3-pod trains during peak morning commute cycles (07:30 - 09:15).",
            "Route automated stormwater runoff through greywater vertical garden hydroponic beds.",
            "Maintain 3.5m pedestrian buffer radius at all street-level crossing nodes."
          ]
        }
      });
    }

    const promptText = `You are a visionary urban planner and autonomous transit architect evaluating a 2040 smart city design.
The design concept: "${conceptPrompt || '2040 isometric urban street intersection with modular Flow Pods, vertical community gardens, and Gemini adaptive light overlays'}"
Selected category focus: "${aspect || 'Smart Layer & Transit Flow'}".

Provide a structured, deeply thoughtful architectural and system critique in JSON format with these exact keys:
{
  "title": "A compelling title for this urban element",
  "transitCoordination": "Detailed insight on modular pod platooning, boarding flow, and intersection throughput",
  "biophilicEfficacy": "Evaluation of the vertical gardens, carbon sequestration, microclimate cooling, and resident connection",
  "adaptiveSmartLayer": "How Gemini's real-time light overlay coordinates pods, micro-mobility, and pedestrians safely",
  "recommendations": ["Actionable design improvement 1", "Actionable design improvement 2", "Actionable design improvement 3"]
}`;

    let contentsPayload: any = promptText;
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      contentsPayload = {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
            }
          },
          { text: promptText }
        ]
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contentsPayload,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error("Gemini analysis error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze concept"
    });
  }
});

// Prompt generator for reimagined city elements (Redesigned Space, System/Service, Structure, Smart Layer, Experience)
app.post("/api/gemini/generate-prompt", async (req, res) => {
  try {
    const { category, customInput } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback prompts
      const templates: Record<string, string> = {
        "redesigned-space": "Photorealistic isometric render of a transformed 2040 multi-tier public plaza where street level is reclaimed for pedestrian parks, bioswales, and modular seating, while whisper-quiet electric Flow Pods glide through recessed perimeter lanes.",
        "system-service": "Isometric detailed infographic render depicting the real-time choreography of autonomous Flow Pods in 2040: dynamically uncoupling at neighborhood hubs, recharging via inductive street pads, and platooning into high-speed transit corridors.",
        "structure-render": "High-detail isometric architectural elevation of a 2040 carbon-negative residential tower featuring modular balcony greenhouses, exterior automated vertical irrigation trellis, solar facade glazing, and rooftop aeroponic gardens.",
        "smart-layer": "Dusk isometric architectural view of an active 2040 intersection showcasing Gemini AI's luminous cyan and amber adaptive guide paths glowing subtly into permeable pavement to route autonomous pods and safeguard pedestrians without traffic lights.",
        "experience": "Immersive isometric street-level view of citizens in 2040 relaxing in lush sidewalk garden pocket parks as sunlit modular Flow Pods arrive smoothly, passenger boarding assisted by soft holographic curb cues and aromatic flowering vines."
      };
      return res.json({
        success: true,
        generatedPrompt: templates[category] || templates["smart-layer"]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `You are an expert prompt engineer specializing in photorealistic isometric architectural renders of 2040 cities.
Create a highly descriptive image generation prompt based on:
Category: ${category}
User focus or keywords: ${customInput || 'Flow pods, vertical gardens, Gemini adaptive light overlay'}

Requirements:
- Must specify photorealistic isometric perspective
- Must describe tangible materials, lighting, lighting cues, vegetation, transit dynamics
- Keep it under 100 words, vivid, direct, and ready for Gemini image generation
Return only the raw prompt string, with no quotation marks or meta commentary.`
    });

    return res.json({
      success: true,
      generatedPrompt: response.text?.trim() || "Isometric render of 2040 urban intersection with Flow Pods and vertical gardens."
    });
  } catch (error: any) {
    console.error("Prompt generation error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate prompt"
    });
  }
});

// Vite middleware / Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
