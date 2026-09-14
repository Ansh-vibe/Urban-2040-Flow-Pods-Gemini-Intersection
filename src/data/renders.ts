import { RenderItem } from '../types';
import mainRenderImg from '../assets/images/urban_intersection_2040_1789367819429.jpg';
import flowPodDetailImg from '../assets/images/flow_pod_detail_2040_1789367836239.jpg';
import lightOverlayImg from '../assets/images/gemini_light_overlay_1789367851959.jpg';

export const INITIAL_RENDERS: RenderItem[] = [
  {
    id: 'master-intersection',
    title: '2040 Autonomous Nexus: Master Isometric View',
    subtitle: 'Modular Flow Pods, Living Facades & Gemini Real-Time Light Routing',
    category: 'smart-layer',
    categoryLabel: 'Smart Layer & Infrastructure',
    imageSrc: mainRenderImg,
    aspectRatio: '16:9',
    fileFormat: 'JPG',
    approxSizeMb: 3.8,
    timeOfDay: 'Day / Golden Hour',
    prompt: "A photorealistic, isometric render of a reimagined urban street intersection in 2040. Show modular, AI-coordinated 'Flow Pods' for public transit replacing traditional buses, integrated with vertical community gardens on all building facades. Gemini's presence is visible as a subtle, adaptive light overlay on the street, guiding the modular transport units in real-time.",
    conceptDescription: "In 2040, the chaotic asphalt street intersection has transformed into a living, intelligent mobility garden. Bulky, polluting 40-foot diesel buses are replaced by modular electric 'Flow Pods' that physically decouple to serve intimate neighborhood streets or couple into flexible transit trains during rush hour. Gemini operates as an ambient civic intelligence, etching non-intrusive luminous velocity corridors and pedestrian safe zones directly onto the street surface.",
    technicalSpecs: [
      { label: 'Transit Topology', value: 'Decoupled Flow Pod Platooning' },
      { label: 'AI Coordination', value: 'Gemini Sub-Second Trajectory Engine' },
      { label: 'Biophilic Envelope', value: '100% Facade Hydroponic Coverage' },
      { label: 'Thermal Relief', value: '-3.4°C Urban Heat Island Reduction' },
      { label: 'Acoustic Footprint', value: '42 dB (Whisper Quiet)' },
      { label: 'Pedestrian Priority', value: 'Zero-Wait Dynamic Crosswalks' }
    ],
    hotspots: [
      {
        id: 'flow-pods',
        x: 48,
        y: 62,
        title: "Modular 'Flow Pods'",
        tag: 'Public Transit',
        description: 'Replaces fixed-route 40ft diesel buses. Autonomous, magnetic-coupling pods adjust passenger capacity in real-time based on demand surges.',
        statLabel: 'Fleet Efficiency',
        statValue: '+340% passenger throughput'
      },
      {
        id: 'gemini-light',
        x: 52,
        y: 78,
        title: 'Gemini Adaptive Light Overlay',
        tag: 'Civic AI Layer',
        description: 'Bioluminescent light veins embedded in permeable recycled pavement. They dynamically forecast pod turning arcs and project illuminated pedestrian sanctuary zones.',
        statLabel: 'Intersection Lag',
        statValue: '0.0 sec (Zero Stoplights)'
      },
      {
        id: 'vertical-gardens',
        x: 24,
        y: 34,
        title: 'Living Facades & Vertical Gardens',
        tag: 'Ecosystem',
        description: 'Hydroponic cascades on residential and commercial building exteriors. Recycles building greywater, yields 1,200 kg of organic greens/year, and insulates architecture.',
        statLabel: 'Carbon Sequestration',
        statValue: '28.4 tons CO₂/block/yr'
      },
      {
        id: 'sky-bridges',
        x: 68,
        y: 28,
        title: 'Aero Skyways & Biophilic Buffers',
        tag: 'Micromobility',
        description: 'Elevated pedestrian bridges connecting building greenspaces, keeping ground-level street flow fluid while providing shade and panoramic botanical walks.',
        statLabel: 'Walkability Score',
        statValue: '99 / 100 Gold Standard'
      }
    ]
  },
  {
    id: 'gemini-neural-overlay',
    title: 'Gemini Adaptive Street Grid (Dusk/Night Mode)',
    subtitle: 'Real-Time Neural Light Paths Coordinating Multi-Directional Transit',
    category: 'system-service',
    categoryLabel: 'System & Service Flow',
    imageSrc: lightOverlayImg,
    aspectRatio: '16:9',
    fileFormat: 'JPG',
    approxSizeMb: 4.1,
    timeOfDay: 'Night / Neural Glow',
    prompt: "A photorealistic isometric evening render of an advanced 2040 smart urban intersection. The streets feature Gemini AI's adaptive light overlay: luminous cyan and warm golden pulse lines etched on the responsive roadway guiding modular autonomous Flow Pods smoothly through cross traffic without stoplights. Towering green buildings with glowing vertical gardens and illuminated glass sky-bridges frame the intersection.",
    conceptDescription: "As darkness falls, the Gemini Civic AI layer becomes the heartbeat of the city. Phosphorescent nano-channels etched into the street surface illuminate in responsive pulses: cool cyan for transit corridors, warm amber for deceleration/docking, and gentle emerald for pedestrian crosswalks. Mechanical traffic signals and street clutter are completely obsolete.",
    technicalSpecs: [
      { label: 'Signaling Tech', value: 'Dynamic Opto-Fluidic Ground Veins' },
      { label: 'Latency', value: '4ms Edge-to-Pod Telemetry' },
      { label: 'Energy Consumption', value: 'Self-powered by Piezoelectric Roadways' },
      { label: 'Accident Rate', value: '0 Reported Collisions Since 2038' }
    ],
    hotspots: [
      {
        id: 'neural-veins',
        x: 50,
        y: 70,
        title: 'Neural Flow Trajectories',
        tag: 'Autonomous Guidance',
        description: 'Gemini continuously balances multi-pod intersections via predictive physics models, weaving pods through cross-traffic with zero halting.',
        statLabel: 'Transit Velocity',
        statValue: '48 km/h continuous flow'
      },
      {
        id: 'night-gardens',
        x: 82,
        y: 42,
        title: 'Photosynthetic Night Illumination',
        tag: 'Urban Forestry',
        description: 'Low-intensity circadian LEDs nurture rooftop produce gardens while casting soft ambient illumination onto street levels, avoiding light pollution.',
        statLabel: 'Pollinator Health',
        statValue: '+85% nocturnal biodiversity'
      }
    ]
  },
  {
    id: 'flow-pod-station-detail',
    title: 'Modular Curbside Station & Pod Architecture',
    subtitle: 'Close-Up of Passenger Docking, Hydroponic Trellis & Smart Surface',
    category: 'structure-render',
    categoryLabel: 'Structure & Infrastructure',
    imageSrc: flowPodDetailImg,
    aspectRatio: '4:3',
    fileFormat: 'JPG',
    approxSizeMb: 3.4,
    timeOfDay: 'Midday / Detail',
    prompt: "A photorealistic architectural close-up isometric view of modular AI-coordinated Flow Pods docking at a curbside multi-tier station in a 2040 smart eco-city. The pod is sleek glass and recycled composite, glowing subtly with interior passenger ambient lighting. In the background, a residential building facade is covered with lush vertical community food gardens, automated drip irrigation, and blooming flowers.",
    conceptDescription: "A focused view of the micro-scale interactions: how a citizen steps directly from a flowering vertical garden sidewalk into an ultra-low-floor Flow Pod. The pods use contactless induction charging embedded in the curbside bay and modular magnetic docking latches to join neighboring units.",
    technicalSpecs: [
      { label: 'Pod Capacity', value: '6–12 seated / 18 standee capacity' },
      { label: 'Materials', value: 'Bio-resins & Aerogel Insulated Smart Glass' },
      { label: 'Recharge Time', value: '30s fast-boost at curb stops' },
      { label: 'Gardening System', value: 'Automated Drip Hydroponics & Misting' }
    ],
    hotspots: [
      {
        id: 'docking-bay',
        x: 46,
        y: 65,
        title: 'Zero-Step Docking Bay',
        tag: 'Universal Access',
        description: 'Level boarding for wheelchairs, strollers, and bicycles. Pods kneel precisely to millimeter tolerances via Gemini optical guidance.',
        statLabel: 'Boarding Speed',
        statValue: '1.8s per passenger'
      },
      {
        id: 'curbside-greens',
        x: 75,
        y: 35,
        title: 'Automated Drip Trellises',
        tag: 'Micro-Hydroponics',
        description: 'Smart sensors regulate nutrient solution to herbs, tomatoes, and dwarf citrus trees climbing the facade columns.',
        statLabel: 'Water Recycling',
        statValue: '94% closed loop'
      }
    ]
  }
];

export const CATEGORY_DEFINITIONS = [
  {
    id: 'redesigned-space',
    title: 'Redesigned Space',
    tagline: 'Show us the transformation',
    description: 'How asphalt, intersections, and street corridors convert into biophilic, human-first public realms.'
  },
  {
    id: 'system-service',
    title: 'System or Service',
    tagline: 'Show us how it flows',
    description: 'How modular Flow Pods platoon, decouple, re-route on demand, and optimize municipal transit logistics.'
  },
  {
    id: 'structure-render',
    title: 'Structure or Infrastructure',
    tagline: 'Show us the design or render',
    description: 'Architectural details of living facade gardens, curbside induction hubs, and smart glass materials.'
  },
  {
    id: 'smart-layer',
    title: 'Smart Layer on the City',
    tagline: 'Show us what it looks like in action',
    description: "Gemini's real-time bioluminescent road overlays, predictive pedestrian routing, and zero-collision flow."
  },
  {
    id: 'experience',
    title: 'New Kind of Experience',
    tagline: 'Show us what people see and feel',
    description: 'The citizen sensory perspective: quiet streets, clean botanical air, seamless transit boarding.'
  }
] as const;
