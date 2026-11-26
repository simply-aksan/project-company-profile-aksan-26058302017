export type PortalSectionId =
  | 'overview'
  | 'studio-showcase'
  | 'client-engineering'
  | 'rd-ventures'
  | 'faq';
export type DialogueTrack = 'Client Engineering' | 'R&D Ventures';

export interface CapabilityPillar {
  id: string;
  code: string;
  titleLeft: string;
  titleRight: string;
  capsuleNote: string;
  summary: string;
  deliverables: string[];
  mediaType: 'image' | 'video';
  mediaSrc: string;
  posterSrc?: string;
  mediaAlt: string;
}

export interface DeliveryStep {
  step: string;
  title: string;
  detail: string;
}

export interface VentureResearchTrack {
  id: string;
  code: string;
  status: 'ACTIVE RESEARCH' | 'IN EXPLORATION';
  domain: string;
  title: string;
  thesis: string;
  focusAreas: string[];
  question: string;
  image: string;
  imageAlt: string;
  videoSrc?: string;
}

export interface StripSpecimen {
  id: string;
  label: string;
  title: string;
  toneBg: string;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  posterSrc?: string;
  mediaAlt: string;
}

export interface StackPrinciple {
  id: string;
  code: string;
  title: string;
  quote: string;
  role: string;
  tag: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * Central studio configuration, media provenance (Unsplash + Mixkit Free License),
 * and Dual-Track content.
 */
export const CONTACT_CONFIG = {
  brandName: 'AksanLab',
  email: 'aksan.zulkarnain@gmail.com',
  whatsappNumber: '',
  locationNote: 'Remote Worldwide · Operating from Indonesia',
};

export function buildMailtoHref(subject: string, body: string): string {
  return `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsAppHref(message: string): string {
  const digits = CONTACT_CONFIG.whatsappNumber.replace(/[^\d]/g, '');
  const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const HERO_MEDIA = {
  mainVideo: '/videos/clip-47051.mp4',
  mainPoster: '/images/dark-pillars.jpg',
  mainAlt: 'Ambient microarchitecture scene illuminated by warm copper pulses in motion',
  insetImage: '/images/studio-desk.jpg',
  insetAlt: 'Minimal wooden studio workstation with design monitor, laptop, and mechanical keyboard',
};

export const ARCH_MARQUEE_TEXT =
  'FREEDOM IN MOTION  •  LET’S MAKE IT MAKE SENSE  •  CLIENT ENGINEERING  •  R&D VENTURES  •  NO RIGID NICHES  •  ';

export const STRIP_SPECIMENS: StripSpecimen[] = [
  {
    id: 'strip-drafting',
    label: 'SYSTEM PLANNING',
    title: 'Architectural Drafting in Motion',
    toneBg: '#EAE4DA',
    mediaType: 'video',
    mediaSrc: '/videos/clip-21226.mp4',
    posterSrc: '/images/arch-concrete.jpg',
    mediaAlt: 'Designer drafting spatial architectural concept beside scale structure',
  },
  {
    id: 'strip-desk',
    label: 'WORKBENCH',
    title: 'Focused Build Environment',
    toneBg: '#E6DDD2',
    mediaType: 'image',
    mediaSrc: '/images/studio-desk.jpg',
    mediaAlt: 'Minimal wooden creative engineering studio workspace',
  },
  {
    id: 'strip-obsidian',
    label: 'SPATIAL DEPTH',
    title: 'Obsidian & Amber Motion',
    toneBg: '#161822',
    mediaType: 'video',
    mediaSrc: '/videos/clip-31497.mp4',
    posterSrc: '/images/glowing-prism.jpg',
    mediaAlt: 'Receding geometric monochrome and amber architectural space in motion',
  },
  {
    id: 'strip-pillars',
    label: 'LIGHT & SHADOW',
    title: 'Calm Golden Symmetry',
    toneBg: '#EFE5DA',
    mediaType: 'image',
    mediaSrc: '/images/dark-pillars.jpg',
    mediaAlt: 'Sunlight beams across fluted raw concrete pillars',
  },
  {
    id: 'strip-code',
    label: 'ENGINEERING',
    title: 'Precision System Logic',
    toneBg: '#1B1F2A',
    mediaType: 'video',
    mediaSrc: '/videos/clip-46635.mp4',
    posterSrc: '/images/glass-facade.jpg',
    mediaAlt: 'Software architect inspecting luminous code reflections',
  },
  {
    id: 'strip-torus',
    label: 'MATERIAL LAB',
    title: 'Iridescent Fluid Form',
    toneBg: '#14151B',
    mediaType: 'image',
    mediaSrc: '/images/metallic-torus.jpg',
    mediaAlt: 'Sculpted iridescent liquid metal torus on dark canvas',
  },
  {
    id: 'strip-corridor',
    label: 'PROPORTION',
    title: 'Curved Concrete Flow',
    toneBg: '#E2E4E1',
    mediaType: 'image',
    mediaSrc: '/images/brutalist-corridor.jpg',
    mediaAlt: 'Curved concrete architectural gallery corridor',
  },
];

export const CLIENT_CAPABILITIES: CapabilityPillar[] = [
  {
    id: 'cap-software',
    code: '01 // WEB & SOFTWARE',
    titleLeft: 'CUSTOM',
    titleRight: 'SYSTEMS',
    capsuleNote: 'Structured web apps, dashboards & workflows engineered around your business.',
    summary:
      'Production-grade web platforms, internal operations dashboards, and bespoke applications built for clarity and long-term ownership.',
    deliverables: [
      'Full-stack React & TypeScript architectures',
      'Clean API integration & operational workflows',
      'Maintainable codebases without brittle vendor lock-in',
    ],
    mediaType: 'image',
    mediaSrc: '/images/studio-desk.jpg',
    mediaAlt: 'Minimal creative engineering workspace with wide monitor and laptop',
  },
  {
    id: 'cap-spatial',
    code: '02 // SPATIAL WEB',
    titleLeft: 'SPATIAL',
    titleRight: 'EXPERIENCES',
    capsuleNote: 'We turn brand positioning into interactive 3D and motion that glides effortlessly.',
    summary:
      'Purposeful WebGL, kinetic choreography, and scroll narratives when flat pages fail to capture the caliber of your company.',
    deliverables: [
      'Real-time Three.js & shader craft tuned for daylight',
      'GSAP + Lenis smooth scroll sequences & physics controls',
      'GPU-guarded performance & reduced-motion support',
    ],
    mediaType: 'video',
    mediaSrc: '/videos/clip-31497.mp4',
    posterSrc: '/images/glass-facade.jpg',
    mediaAlt: 'Dynamic geometric architectural spatial simulation in amber and obsidian',
  },
  {
    id: 'cap-ai',
    code: '03 // APPLIED AI',
    titleLeft: 'APPLIED AI',
    titleRight: 'AUTOMATION',
    capsuleNote: 'Quiet AI tools that absorb operational fatigue instead of adding noisy chat bloat.',
    summary:
      'Practical AI pipelines and structured software interfaces engineered to remove manual coordination bottlenecks.',
    deliverables: [
      'Document intelligence & structured workflow orchestration',
      'Human-in-the-loop operational co-pilots',
      'Calm summary interfaces designed for fast founder decisions',
    ],
    mediaType: 'video',
    mediaSrc: '/videos/clip-46635.mp4',
    posterSrc: '/images/dark-pillars.jpg',
    mediaAlt: 'Engineer closely reviewing structured systems code',
  },
  {
    id: 'cap-arch',
    code: '04 // ARCHITECTURE',
    titleLeft: 'PRODUCT',
    titleRight: 'SYSTEMS',
    capsuleNote: 'Every component, token, and user journey moving harmoniously in one clear direction.',
    summary:
      'Cohesive design systems and information architecture transforming ambitious ideas into calm, readable workspaces.',
    deliverables: [
      'Brand-aligned information architecture & navigation flows',
      'Tokenized UI libraries ready to scale across products',
      'End-to-end QA across desktop, tablet, and mobile ergonomics',
    ],
    mediaType: 'image',
    mediaSrc: '/images/concrete-skylight.jpg',
    mediaAlt: 'Architectural concrete skylight atrium demonstrating balance and natural light',
  },
];

export const CLIENT_CADENCE: DeliveryStep[] = [
  {
    step: 'PHASE 01',
    title: 'Clarity & Scope Brief',
    detail:
      'We untangle the real operational bottleneck first so we only build what removes friction and unlocks growth.',
  },
  {
    step: 'PHASE 02',
    title: 'Structured Engineering',
    detail:
      'Clean modular execution with transparent milestones, disciplined code quality, and calm communication cadence.',
  },
  {
    step: 'PHASE 03',
    title: 'Peaceful Handover',
    detail:
      'Documentation, responsive verification, and maintainable ownership so your team operates freely without lock-in.',
  },
];

export const VENTURE_TRACKS: VentureResearchTrack[] = [
  {
    id: 'spatial-interactive-web',
    code: 'LAB 01',
    status: 'ACTIVE RESEARCH',
    domain: 'WEBGL · SAKUGA PHYSICS · MOTION',
    title: 'Spatial & Interactive Web',
    thesis:
      'Exploring real-time browser graphics and kinetic micro-physics that create atmosphere, expressive delight, and clarity without sacrificing speed.',
    focusAreas: [
      'Eulerian ink & ambient fluid studies in daylight palettes',
      'Sakuga frame-by-frame squash-and-stretch UI component craft',
      'Narrative interfaces for brand launches and flagship web spaces',
    ],
    question:
      'How can real-time browser physics blend tactile playfulness with quiet architectural poise?',
    image: '/images/glowing-prism.jpg',
    imageAlt: 'Optical glass prisms refracting rainbow light spectrum beams in dark studio',
    videoSrc: '/videos/clip-47051.mp4',
  },
  {
    id: 'calm-ai-systems',
    code: 'LAB 02',
    status: 'IN EXPLORATION',
    domain: 'AUTOMATION · SOFTWARE · COGNITION',
    title: 'Calm AI Systems',
    thesis:
      'Designing human-paced software systems and quiet AI utilities that absorb operational noise so founders and small teams reclaim headspace.',
    focusAreas: [
      'Low-friction brief synthesis and workflow orchestration',
      'Predictable human-readable summaries over noisy notification feeds',
      'Practical integrations connecting existing tools smoothly',
    ],
    question:
      'What does software look like when success is measured by hours of calm attention returned to the operator?',
    image: '/images/geo-shadow.jpg',
    imageAlt: 'Minimal geometric light edge meeting deep charcoal obsidian shadow plane',
  },
  {
    id: 'next-gen-digital-brands',
    code: 'LAB 03',
    status: 'IN EXPLORATION',
    domain: 'VENTURES · COMMERCE · IDENTITY',
    title: 'Next-Gen Digital Brands',
    thesis:
      'Incubating original multi-niche brand concepts and digital product prototypes unhindered by single-industry boundaries.',
    focusAreas: [
      'Cross-disciplinary concept validation from narrative to prototype',
      'Tactile digital commerce and boutique brand worlds',
      'Co-building ventures ready to spin out as focused standalone products',
    ],
    question:
      'How can one independent studio sustainably test, shape, and launch distinct brands across disciplines?',
    image: '/images/metallic-torus.jpg',
    imageAlt: 'Fluid metallic iridescent torus sculpture hovering against dark studio ground',
  },
];

export const STACK_PRINCIPLES: StackPrinciple[] = [
  {
    id: 'prin-freedom',
    code: 'CONVICTION 01 / FREEDOM',
    title: 'Freedom From Rigid Templates',
    quote:
      'Good software expands what a company can do instead of trapping its team inside brittle tools or copy-paste website formulas.',
    role: 'AksanLab Engineering Ethos',
    tag: 'Modular Ownership',
  },
  {
    id: 'prin-stillness',
    code: 'CONVICTION 02 / STILLNESS',
    title: 'Operational Peace Beats Flashy Noise',
    quote:
      'Motion and 3D craft should serve orientation and emotion cleanly — never hide weak structure behind visual chaos.',
    role: 'Spatial Art Direction',
    tag: 'Calm Cadence',
  },
  {
    id: 'prin-harmony',
    code: 'CONVICTION 03 / HARMONY',
    title: 'Open Research Feeds Client Rigor',
    quote:
      'Every shader experiment, micro-interaction, and AI workflow built in our Lab sharpens the reliability we bring to real client launches.',
    role: 'Dual-Track Synergy',
    tag: 'Living Lab',
  },
  {
    id: 'prin-manifest',
    code: 'CONVICTION 04 / CRAFTSMANSHIP',
    title: 'Unbound Across Disciplines',
    quote:
      'Whether shipping a B2B web platform or prototyping a kinetic consumer world, precision thinking translates cleanly across every niche.',
    role: 'Cross-Domain Execution',
    tag: 'Built to Endure',
  },
];

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: 'What kinds of projects does AksanLab take on?',
    a: 'Under Client Engineering, we build custom web applications, interactive brand websites, AI-assisted operational workflows, and product UI architecture for startups and modern businesses.',
  },
  {
    q: 'Why operate both Client Engineering and an R&D Laboratory?',
    a: 'Client builds keep our engineering grounded in real operational constraints, while the R&D Lab gives us freedom to pioneer new visual optics, kinetic controls, and calm software concepts without creative stagnation.',
  },
  {
    q: 'Can we hire AksanLab purely for software engineering or just an interactive web flagship?',
    a: 'Yes. Some partners engage us solely for structured backend/frontend systems; others come specifically to elevate a launch website with WebGL, Lenis choreography, and distinctive interactive storytelling.',
  },
  {
    q: 'How do your Client engagements usually start?',
    a: 'Every engagement begins with a focused Clarity & Scope Brief via Start a Dialogue, aligning on core business bottlenecks, real timeline constraints, and ownership goals before writing production code.',
  },
  {
    q: 'Are the R&D Venture tracks open to outside collaborators or co-builders?',
    a: 'Yes — all three tracks (Spatial & Interactive Web, Calm AI Systems, and Next-Gen Digital Brands) welcome early pilot partners and co-builders exploring shared experiments.',
  },
];

export const DIALOGUE_SCOPES: Record<DialogueTrack, string[]> = {
  'Client Engineering': [
    'Web / Application Build',
    'Interactive Spatial Hero',
    'AI Workflow Automation',
    'Product & UI System',
  ],
  'R&D Ventures': [
    'Spatial Web Experiment',
    'Calm AI Prototype',
    'Co-Building / Brand Venture',
    'General Lab Dialogue',
  ],
};
