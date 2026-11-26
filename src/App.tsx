import Lenis from 'lenis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ClientEngineeringSection } from './components/ClientEngineeringSection';
import { CurvedArchMarquee } from './components/CurvedArchMarquee';
import { DialogueModal } from './components/DialogueModal';
import { HeaderBackdropTone, HeaderPortal } from './components/HeaderPortal';
import { HeroStage } from './components/HeroStage';
import { PhilosophyBand } from './components/PhilosophyBand';
import { ShowcaseStrip } from './components/ShowcaseStrip';
import { VenturesSection } from './components/VenturesSection';
import { DialogueTrack, PortalSectionId } from './data/aksanContent';
import { gsap, prefersReducedMotion, ScrollTrigger } from './lib/gsap';
import { applyAksanSakugaTheme } from './lib/sakugaTheme';

const PORTAL_IDS: PortalSectionId[] = [
  'overview',
  'studio-showcase',
  'client-engineering',
  'rd-ventures',
  'faq',
];

const BAND_TONES: { id: string; tone: HeaderBackdropTone }[] = [
  { id: 'overview', tone: 'light' },
  { id: 'studio-showcase', tone: 'light' },
  { id: 'client-engineering', tone: 'light' },
  { id: 'rd-ventures', tone: 'dark' },
  { id: 'stack-convictions', tone: 'terracotta' },
  { id: 'faq', tone: 'light' },
  { id: 'studio-footer', tone: 'terracotta' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<PortalSectionId>('overview');
  const [headerTone, setHeaderTone] = useState<HeaderBackdropTone>('light');
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [dialogueTrack, setDialogueTrack] = useState<DialogueTrack>('Client Engineering');
  const [dialogueScope, setDialogueScope] = useState<string | undefined>(undefined);
  const [dialogueNote, setDialogueNote] = useState('');

  const lenisRef = useRef<Lenis | null>(null);

  const syncScrollIndicators = useCallback(() => {
    // Active nav check at upper-third viewport focal line
    const navFocalY = Math.min(260, window.innerHeight * 0.28);
    let nextActive: PortalSectionId = 'overview';
    for (const id of PORTAL_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= navFocalY) {
        nextActive = id;
      }
    }
    setActiveSection((prev) => (prev === nextActive ? prev : nextActive));

    // Contrast check strictly behind the floating center header at y = 30px
    const headerSampleY = 30;
    let nextTone: HeaderBackdropTone = 'light';
    for (const band of BAND_TONES) {
      const el = document.getElementById(band.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= headerSampleY && rect.bottom > headerSampleY) {
        nextTone = band.tone;
        break;
      }
    }
    setHeaderTone((prev) => (prev === nextTone ? prev : nextTone));
  }, []);

  useEffect(() => {
    applyAksanSakugaTheme();
    syncScrollIndicators();

    window.addEventListener('scroll', syncScrollIndicators, { passive: true });
    window.addEventListener('resize', syncScrollIndicators, { passive: true });

    if (prefersReducedMotion()) {
      return () => {
        window.removeEventListener('scroll', syncScrollIndicators);
        window.removeEventListener('resize', syncScrollIndicators);
      };
    }

    const lenis = new Lenis({
      duration: 1.22,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const onLenisScroll = () => {
      syncScrollIndicators();
      ScrollTrigger.update();
    };
    lenis.on('scroll', onLenisScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
      syncScrollIndicators();
    });
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      syncScrollIndicators();
    }, 160);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('scroll', syncScrollIndicators);
      window.removeEventListener('resize', syncScrollIndicators);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [syncScrollIndicators]);

  const handleNavigatePortal = (id: PortalSectionId) => {
    setActiveSection(id);
    const target = document.getElementById(id);
    if (!target) return;

    if (lenisRef.current && !prefersReducedMotion()) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.25 });
    } else {
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const openDialogueWith = (track: DialogueTrack, note = '', scope?: string) => {
    setDialogueTrack(track);
    setDialogueScope(scope);
    setDialogueNote(note);
    setDialogueOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--surface-paper)] text-[var(--ink-primary)]">
      {/* Subtle Paper Grain Layer */}
      <div
        aria-hidden="true"
        className="aksan-paper-grain pointer-events-none fixed inset-0 z-50"
      />

      <HeaderPortal
        activeSection={activeSection}
        headerTone={headerTone}
        onNavigate={handleNavigatePortal}
        onOpenDialogue={() => openDialogueWith('Client Engineering', '')}
      />

      <main>
        <HeroStage
          onNavigate={handleNavigatePortal}
          onOpenDialogue={() => openDialogueWith('Client Engineering', '')}
        />

        <CurvedArchMarquee />

        <ShowcaseStrip
          onSelectSpecimen={(specimen) =>
            openDialogueWith(
              'Client Engineering',
              `Inspired by the "${specimen.title}" studio wall specimen — would like to discuss a system or brand build.`,
              'Interactive Spatial Hero'
            )
          }
        />

        <ClientEngineeringSection
          onStartClientBrief={() =>
            openDialogueWith(
              'Client Engineering',
              'Interested in discussing a client engineering engagement with AksanLab.'
            )
          }
        />

        <VenturesSection
          onCollaborateTrack={(trackTitle) => {
            const scopeMap: Record<string, string> = {
              'Spatial & Interactive Web': 'Spatial Web Experiment',
              'Calm AI Systems': 'Calm AI Prototype',
              'Next-Gen Digital Brands': 'Co-Building / Brand Venture',
            };
            openDialogueWith(
              'R&D Ventures',
              `Exploring partnership or early collaboration around "${trackTitle}".`,
              scopeMap[trackTitle]
            );
          }}
        />

        <PhilosophyBand
          onOpenDialogue={() => openDialogueWith('Client Engineering', '')}
          onNavigate={handleNavigatePortal}
        />
      </main>

      <DialogueModal
        open={dialogueOpen}
        initialTrack={dialogueTrack}
        initialScope={dialogueScope}
        initialNote={dialogueNote}
        onClose={() => setDialogueOpen(false)}
      />
    </div>
  );
}
