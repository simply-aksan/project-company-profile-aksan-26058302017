import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onOpenContact: (subject: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [activeSection, setActiveSection] = useState<'home' | 'studio' | 'work'>('home');
  const [gliderStyle, setGliderStyle] = useState<React.CSSProperties>({});
  const navRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLAnchorElement>(null);
  const studioRef = useRef<HTMLAnchorElement>(null);
  const workRef = useRef<HTMLAnchorElement>(null);

  const getElementForSection = (section: 'home' | 'studio' | 'work') => {
    switch (section) {
      case 'home':
        return homeRef.current;
      case 'studio':
        return studioRef.current;
      case 'work':
        return workRef.current;
    }
  };

  const updateGlider = (target: HTMLElement | null) => {
    if (!target || !navRef.current) return;
    const navLeft = navRef.current.getBoundingClientRect().left;
    const targetRect = target.getBoundingClientRect();
    const padLeft = parseFloat(getComputedStyle(navRef.current).paddingLeft) || 4;

    setGliderStyle({
      width: `${target.offsetWidth}px`,
      transform: `translateX(${target.offsetLeft - padLeft}px)`,
    });
  };

  useEffect(() => {
    updateGlider(getElementForSection(activeSection));
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const studioEl = document.getElementById('studio');
      const workEl = document.getElementById('work');

      const scrollY = window.scrollY + 200;

      if (workEl && scrollY >= workEl.offsetTop) {
        setActiveSection('work');
      } else if (studioEl && scrollY >= studioEl.offsetTop) {
        setActiveSection('studio');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => updateGlider(getElementForSection(activeSection)));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => updateGlider(getElementForSection(activeSection)));
    };
  }, [activeSection]);

  return (
    <div className="hero-top-row-mobile">
      <nav
        className="hero-nav"
        id="hero-nav"
        ref={navRef}
        aria-label="Primary Navigation"
        onMouseLeave={() => updateGlider(getElementForSection(activeSection))}
      >
        <span className="nav-glider" style={gliderStyle} aria-hidden="true" />
        <a
          href="#home"
          ref={homeRef}
          className={`nav-item ${activeSection === 'home' ? 'is-active is-pill-target' : ''}`}
          onMouseEnter={(e) => updateGlider(e.currentTarget)}
          onClick={() => setActiveSection('home')}
        >
          Home
        </a>
        <a
          href="#studio"
          ref={studioRef}
          className={`nav-item ${activeSection === 'studio' ? 'is-active is-pill-target' : ''}`}
          onMouseEnter={(e) => updateGlider(e.currentTarget)}
          onClick={() => setActiveSection('studio')}
        >
          Studio
        </a>
        <a
          href="#work"
          ref={workRef}
          className={`nav-item ${activeSection === 'work' ? 'is-active is-pill-target' : ''}`}
          onMouseEnter={(e) => updateGlider(e.currentTarget)}
          onClick={() => setActiveSection('work')}
        >
          Work
        </a>
      </nav>

      <div className="hero-top-meta" data-hero-stagger>
        <span>Technology</span>
        <span className="meta-muted"> / &amp; Product Studio</span>
      </div>

      <button
        type="button"
        className="hero-contact-btn"
        onClick={() => onOpenContact('Start a Conversation')}
        aria-label="Contact Rekavanta"
      >
        <span className="desktop-contact-label">Contact ↗</span>
        <span className="mobile-only-arrow" aria-hidden="true">
          ↗
        </span>
      </button>
    </div>
  );
};

