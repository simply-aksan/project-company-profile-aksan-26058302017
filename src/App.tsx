import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';
import { ClientEngineeringSection } from './components/ClientEngineeringSection';
import { CurvedArchMarquee } from './components/CurvedArchMarquee';
import { DialogueModal } from './components/DialogueModal';
import { HeaderPortal } from './components/HeaderPortal';
import { HeroStage } from './components/HeroStage';
import { PhilosophyBand } from './components/PhilosophyBand';
import { ShowcaseStrip } from './components/ShowcaseStrip';
import { VenturesSection } from './components/VenturesSection';
import { DialogueTrack, PortalSectionId } from './data/aksanContent';
import { gsap, prefersReducedMotion, ScrollTrigger } from './lib/gsap';
import { applyAksanSakugaTheme } from './lib/sakugaTheme';

export default function App() {
  const [activeSection, setActiveSection] = useState<PortalSectionId>('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [dialogueTrack, setDialogueTrack] = useState<DialogueTrack>('Client Engineering');
  const [dialogueScope, setDialogueScope] = useState<string | undefined>(undefined);
  const [dialogueNote, setDialogueNote] = useState('');

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    applyAksanSakugaTheme();

    const updateScrollGauge = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.max(0, Math.min(1, window.scrollY / maxScroll)));
      }
    };

    if (prefersReducedMotion()) {
      window.addEventListener('scroll', updateScrollGauge, { passive: true });
      return () => window.removeEventListener('scroll', updateScrollGauge);
    }

    const lenis = new Lenis({
      duration: 1.22,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const onLenisScroll = ({ progress }: { progress: number }) => {
      setScrollProgress(Math.max(0, Math.min(1, progress)));
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
    });
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 160);

    return () => {
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const ids: PortalSectionId[] = [
      'overview',
      'studio-showcase',
      'client-engineering',
      'rd-ventures',
      'faq',
    ];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as PortalSectionId);
        }
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigatePortal = (id: PortalSectionId) => {
    setActiveSection(id);
    const target = document.getElementById(id);
    if (!target) return;

    if (lenisRef.current && !prefersReducedMotion()) {
      lenisRef.current.scrollTo(target, { offset: -64, duration: 1.25 });
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
        scrollProgress={scrollProgress}
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
