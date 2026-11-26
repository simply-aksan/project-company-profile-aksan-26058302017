import { useEffect, useRef, useState } from 'react';
import {
  buildMailtoHref,
  buildWhatsAppHref,
  CONTACT_CONFIG,
  DIALOGUE_SCOPES,
  DialogueTrack,
} from '../data/aksanContent';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import type { SakugaToastElement } from '../types/sakuga';
import { SakugaBtn, SakugaInputControl } from './SakugaControl';

interface DialogueModalProps {
  open: boolean;
  initialTrack: DialogueTrack;
  initialScope?: string;
  initialNote?: string;
  onClose: () => void;
}

export function DialogueModal({
  open,
  initialTrack,
  initialScope,
  initialNote = '',
  onClose,
}: DialogueModalProps) {
  const [track, setTrack] = useState<DialogueTrack>(initialTrack);
  const [scope, setScope] = useState<string>(initialScope || DIALOGUE_SCOPES[initialTrack][0]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState(initialNote);
  const [copied, setCopied] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<SakugaToastElement>(null);

  useEffect(() => {
    setTrack(initialTrack);
    setScope(initialScope || DIALOGUE_SCOPES[initialTrack][0]);
    setMessage(initialNote);
    setCopied(false);
  }, [initialTrack, initialScope, initialNote, open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (!prefersReducedMotion()) {
      if (backdropRef.current) {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 18, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power4.out' }
        );
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const trimmedName = name.trim() || 'Founder / Prospective Partner';
  const trimmedMsg =
    message.trim() || 'Looking to start an initial conversation with AksanLab.';
  const emailSubject = `[AksanLab · ${track}] ${scope} — ${trimmedName}`;
  const fullBriefText = [
    `Hello AksanLab,`,
    ``,
    `Name / Company: ${trimmedName}`,
    `Portal Track: ${track}`,
    `Focus Area: ${scope}`,
    ``,
    `Brief:`,
    trimmedMsg,
  ].join('\n');

  const mailtoUrl = buildMailtoHref(emailSubject, fullBriefText);
  const whatsappUrl = buildWhatsAppHref(fullBriefText);

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(fullBriefText);
      setCopied(true);
      toastRef.current?.show('Brief copied to clipboard');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialogue-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(17, 18, 24, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={cardRef}
        className="max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-2xl border-2 border-[#161920] bg-[var(--surface-elevated)] p-6 shadow-[8px_8px_0px_rgba(232,84,39,0.28)] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--hairline)] pb-4">
          <div>
            <span className="font-mono-index text-[11px] tracking-[0.15em] text-[#E85427] uppercase">
              INQUIRY BRIEF · TWO-TRACK STUDIO
            </span>
            <h2
              id="dialogue-modal-title"
              className="mt-1.5 text-2xl font-semibold tracking-[-0.015em] text-[#161920]"
            >
              Start a Dialogue
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close dialogue modal"
            onClick={onClose}
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border-2 border-[#161920] text-lg text-[#161920] transition-colors hover:bg-[#161920] hover:text-[#FAF8F3]"
          >
            &times;
          </button>
        </div>

        {/* Step 1: Select Track */}
        <div className="mt-5">
          <div className="font-mono-index text-[11px] tracking-[0.12em] text-[#59606E] uppercase">
            01. Choose Track
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(['Client Engineering', 'R&D Ventures'] as DialogueTrack[]).map((item) => {
              const active = track === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTrack(item);
                    setScope(DIALOGUE_SCOPES[item][0]);
                  }}
                  className={`min-h-[44px] rounded-lg border-2 px-3 text-xs font-semibold tracking-[0.04em] transition-colors ${
                    active
                      ? 'border-[#161920] bg-[#161920] text-[#F4F1EA]'
                      : 'border-[var(--hairline-strong)] bg-[var(--surface-paper)] text-[#4A515D] hover:border-[#161920]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Scope */}
        <div className="mt-5">
          <div className="font-mono-index text-[11px] tracking-[0.12em] text-[#59606E] uppercase">
            02. Focus Area
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {DIALOGUE_SCOPES[track].map((option) => {
              const selected = scope === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setScope(option)}
                  className={`min-h-[40px] rounded-full border px-3.5 text-xs transition-colors ${
                    selected
                      ? 'border-[#E85427] bg-[var(--accent-copper-soft)] font-semibold text-[#9A522E]'
                      : 'border-[var(--hairline-strong)] bg-[var(--surface-paper)] text-[#59606E] hover:border-[#161920]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3 & 4: Sakuga Caret-Dust Input + Context Textarea */}
        <div className="mt-5 space-y-4">
          <div>
            <div className="font-mono-index mb-1.5 block text-[11px] tracking-[0.12em] text-[#59606E] uppercase">
              03. Your Name / Organization (Type for kinetic caret)
            </div>
            <SakugaInputControl
              label="Your Name or Organization"
              placeholder="e.g. Nadia Rahman · Northgate Labs"
              value={name}
              onChange={setName}
            />
          </div>

          <div>
            <label
              htmlFor="dialogue-brief"
              className="font-mono-index block text-[11px] tracking-[0.12em] text-[#59606E] uppercase"
            >
              04. Brief Context
            </label>
            <textarea
              id="dialogue-brief"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share what you are building, key bottleneck, or timeline..."
              className="mt-1.5 w-full rounded-xl border-2 border-[#161920] bg-[var(--surface-paper)] p-3.5 text-base text-[#161920] placeholder:text-[#59606E]/60 focus:border-[#E85427] focus:outline-none"
            />
          </div>
        </div>

        {/* Direct Endpoints: Email + WhatsApp + Sakuga Copy Action */}
        <div className="mt-6 space-y-3 border-t border-[var(--hairline)] pt-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={mailtoUrl}
              className="flex min-h-[46px] items-center justify-center rounded-full bg-[#E85427] px-5 text-xs font-semibold tracking-[0.07em] text-[#FAF8F3] uppercase transition-colors hover:bg-[#161920]"
            >
              Send via Email
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[46px] items-center justify-center rounded-full border-2 border-[#161920] bg-transparent px-5 text-xs font-semibold tracking-[0.07em] text-[#161920] uppercase transition-colors hover:bg-[#161920] hover:text-[#F4F1EA]"
            >
              Continue on WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-[#59606E]">
            <span>
              Direct: <span className="font-medium text-[#161920]">{CONTACT_CONFIG.email}</span>
            </span>
            <SakugaBtn
              variant="secondary"
              className="sakuga-compact"
              onClick={handleCopyBrief}
              ariaLabel="Copy formatted brief"
            >
              {copied ? 'Copied Brief' : 'Copy Brief'}
            </SakugaBtn>
          </div>
        </div>
      </div>

      <sakuga-toast
        ref={toastRef}
        duration="2.4"
        style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 70 }}
      />
    </div>
  );
}
