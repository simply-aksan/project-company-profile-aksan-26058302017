import { ReactNode, useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

interface MagneticPillProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Restrained spring-magnetic button wrapper active on fine-pointer desktops
 * and bypassed automatically under reduced motion or touch viewports.
 */
export function MagneticPill({
  children,
  className = '',
  strength = 0.24,
  onClick,
  ariaLabel,
}: MagneticPillProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP({ scope: btnRef });

  const handleMove = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, {
      x: dx,
      y: dy,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });

  const handleLeave = contextSafe(() => {
    const el = btnRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.75,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    });
  });

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </button>
  );
}
