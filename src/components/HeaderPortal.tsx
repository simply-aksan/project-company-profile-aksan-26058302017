import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PortalSectionId } from '../data/aksanContent';

export type HeaderBackdropTone = 'light' | 'dark' | 'terracotta';

interface HeaderPortalProps {
  activeSection: PortalSectionId;
  headerTone: HeaderBackdropTone;
  onNavigate: (id: PortalSectionId) => void;
  onOpenDialogue: () => void;
}

const PORTAL_ITEMS: { id: PortalSectionId; code: string; label: string; shortLabel: string }[] = [
  { id: 'overview', code: '01', label: 'Overview', shortLabel: 'Overview' },
  { id: 'studio-showcase', code: '02', label: 'Studio Wall', shortLabel: 'Studio' },
  { id: 'client-engineering', code: '03', label: 'Client Engineering', shortLabel: 'Client' },
  { id: 'rd-ventures', code: '04', label: 'R&D Lab', shortLabel: 'R&D' },
  { id: 'faq', code: '05', label: 'FAQ', shortLabel: 'FAQ' },
];

export function HeaderPortal({
  activeSection,
  headerTone,
  onNavigate,
  onOpenDialogue,
}: HeaderPortalProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isLightBehind = headerTone === 'light';

  const activeItem =
    PORTAL_ITEMS.find((item) => item.id === activeSection) ?? PORTAL_ITEMS[0];

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
    };
  }, [menuOpen]);

  const handleSelectSection = (id: PortalSectionId) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-transparent"
    >
      <div className="aksan-container pt-3 sm:pt-4">
        {/* True 3-column grid on lg+ eliminates logo/nav collision at every width */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Left Column: Mobile/Tablet Menu Trigger (< lg) OR Full Nav Pills (lg+) */}
          <div className="pointer-events-auto justify-self-start">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-portal-drawer"
              aria-label="Toggle studio navigation menu"
              className={`inline-flex h-[34px] items-center gap-1.5 rounded-full px-3 text-[11.5px] font-medium tracking-[0.02em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427] lg:hidden ${
                menuOpen
                  ? 'bg-[#161920] text-[#FAF8F3] shadow-[0_2px_8px_rgba(22,25,32,0.2)]'
                  : 'border border-[#161920]/12 bg-white/95 text-[#161920] shadow-[0_1px_5px_rgba(22,25,32,0.08)]'
              }`}
            >
              {menuOpen ? (
                <X className="h-3.5 w-3.5 stroke-[2.2]" />
              ) : (
                <Menu className="h-3.5 w-3.5 stroke-[2.2]" />
              )}
              <span>{activeItem.shortLabel}</span>
            </button>

            <nav
              aria-label="Primary studio portals"
              className="hidden items-center gap-1.5 lg:flex"
            >
              {PORTAL_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSection(item.id)}
                    className={`inline-flex h-[32px] items-center rounded-full px-3 text-[11.5px] font-medium tracking-[0.02em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427] ${
                      active
                        ? isLightBehind
                          ? 'bg-[#161920] text-[#FAF8F3] shadow-[0_2px_8px_rgba(22,25,32,0.16)]'
                          : 'border border-white/35 bg-[#161920] text-[#FAF8F3] shadow-[0_2px_8px_rgba(0,0,0,0.35)]'
                        : 'border border-[#161920]/10 bg-white/95 text-[#161920] shadow-[0_1px_4px_rgba(22,25,32,0.06)] hover:bg-white'
                    }`}
                  >
                    {item.shortLabel}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center Column: Adaptive Floating Brand Identity */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleSelectSection('overview');
            }}
            className="pointer-events-auto inline-flex items-center justify-self-center gap-2 rounded-full px-1 py-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke={isLightBehind ? '#161920' : '#FAF8F3'}
                strokeWidth="1.6"
              />
              <circle
                cx="16"
                cy="16"
                r="5"
                stroke={isLightBehind ? '#E85427' : '#FAF8F3'}
                strokeWidth="1.8"
              />
              <line
                x1="16"
                y1="2"
                x2="16"
                y2="11"
                stroke={isLightBehind ? '#161920' : '#FAF8F3'}
                strokeWidth="1.4"
              />
              <line
                x1="16"
                y1="21"
                x2="16"
                y2="30"
                stroke={isLightBehind ? '#161920' : '#FAF8F3'}
                strokeWidth="1.4"
              />
            </svg>
            <span
              className={`font-display text-sm font-bold tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 sm:text-[15px] ${
                isLightBehind ? 'text-[#E85427]' : 'text-[#FAF8F3]'
              }`}
            >
              AksanLab
            </span>
          </a>

          {/* Right Column: Concise Schedule Meta + Compact Two26 CTA Pill */}
          <div className="pointer-events-auto flex items-center justify-self-end gap-3.5">
            <div
              className={`hidden flex-col text-right font-mono-index text-[10px] leading-tight tracking-[0.04em] transition-colors duration-300 xl:flex ${
                isLightBehind ? 'text-[#161920]/75' : 'text-[#FAF8F3]/95'
              }`}
            >
              <span>Monday-Friday</span>
              <span>Global Remote</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenDialogue();
              }}
              aria-label="Start a Dialogue"
              className={`group inline-flex h-[34px] shrink-0 items-center gap-2 rounded-full bg-[#161920] pr-1.5 pl-3.5 text-[11.5px] font-medium tracking-[0.02em] whitespace-nowrap text-[#FAF8F3] shadow-[0_2px_10px_rgba(22,25,32,0.18)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85427] ${
                isLightBehind ? '' : 'border border-white/25'
              }`}
            >
              <span>Let&apos;s Talk</span>
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#E85427] text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Floating Drawer Panel (< lg) */}
        {menuOpen && (
          <nav
            id="mobile-portal-drawer"
            aria-label="Mobile studio portals"
            className="pointer-events-auto mt-2.5 w-full max-w-[270px] rounded-2xl border-2 border-[#161920] bg-[#FAF8F3]/95 p-2 shadow-[6px_6px_0px_rgba(22,25,32,0.18)] backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {PORTAL_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSection(item.id)}
                    className={`flex min-h-[44px] w-full items-center justify-between rounded-xl px-3.5 text-left text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-[#161920] text-[#FAF8F3]'
                        : 'text-[#161920] hover:bg-[#F7ECE6]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`font-mono-index text-[10px] tracking-[0.12em] ${
                        active ? 'text-[#FF8A65]' : 'text-[#59606E]'
                      }`}
                    >
                      {item.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
