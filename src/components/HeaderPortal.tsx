import { PortalSectionId } from '../data/aksanContent';
import { SakugaBtn } from './SakugaControl';

interface HeaderPortalProps {
  activeSection: PortalSectionId;
  scrollProgress: number;
  onNavigate: (id: PortalSectionId) => void;
  onOpenDialogue: () => void;
}

const PORTAL_ITEMS: { id: PortalSectionId; label: string; shortLabel: string }[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview' },
  { id: 'studio-showcase', label: 'Studio Wall', shortLabel: 'Studio' },
  { id: 'client-engineering', label: 'Client Engineering', shortLabel: 'Client' },
  { id: 'rd-ventures', label: 'R&D Ventures', shortLabel: 'R&D Lab' },
  { id: 'faq', label: 'FAQ', shortLabel: 'FAQ' },
];

export function HeaderPortal({
  activeSection,
  scrollProgress,
  onNavigate,
  onOpenDialogue,
}: HeaderPortalProps) {
  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--hairline)]"
      style={{
        backgroundColor: 'rgba(244, 241, 234, 0.9)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Top Scroll Progress Needle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[2.5px] w-full origin-left bg-[#E85427]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
        {/* Brand Identity */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('overview');
          }}
          className="flex min-h-[44px] items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="16" cy="16" r="14" stroke="#161920" strokeWidth="1.4" />
            <circle cx="16" cy="16" r="5" stroke="#E85427" strokeWidth="1.5" />
            <line x1="16" y1="2" x2="16" y2="11" stroke="#161920" strokeWidth="1.2" />
            <line x1="16" y1="21" x2="16" y2="30" stroke="#161920" strokeWidth="1.2" />
          </svg>
          <span className="text-sm font-semibold tracking-[0.14em] text-[#161920] uppercase">
            AksanLab
          </span>
        </a>

        {/* Desktop Navigation Switcher */}
        <nav
          aria-label="Primary studio portals"
          className="hidden items-center gap-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-elevated)] p-1 md:flex"
        >
          {PORTAL_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`transition-expo min-h-[38px] rounded-full px-3.5 text-xs font-medium tracking-[0.04em] transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427] lg:px-4 ${
                  active
                    ? 'bg-[#161920] text-[#F4F1EA]'
                    : 'text-[#59606E] hover:text-[#161920]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Primary Header Sakuga Trigger */}
        <div className="shrink-0">
          <SakugaBtn
            variant="primary"
            className="sakuga-compact"
            onClick={(done) => {
              done();
              setTimeout(onOpenDialogue, 140);
            }}
            ariaLabel="Start a Dialogue"
          >
            Let&apos;s Talk
          </SakugaBtn>
        </div>
      </div>

      {/* Mobile Portal Strip */}
      <nav
        aria-label="Mobile studio portals"
        className="flex border-t border-[var(--hairline)] bg-[var(--surface-elevated)]/80 px-3 py-1 md:hidden"
      >
        <div className="flex w-full items-center justify-between gap-1">
          {PORTAL_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`min-h-[42px] flex-1 rounded-full px-2 text-center text-[11.5px] font-medium transition-colors duration-300 ${
                  active
                    ? 'bg-[#161920] text-[#F4F1EA]'
                    : 'text-[#59606E] hover:text-[#161920]'
                }`}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
