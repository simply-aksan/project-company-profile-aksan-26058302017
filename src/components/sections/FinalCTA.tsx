import React from 'react';

interface FinalCTAProps {
  onOpenContact: (subject: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenContact }) => {
  return (
    <div className="final-cta-banner">
      <div>
        <h3 className="final-cta-title">Have an idea worth building?</h3>
        <p className="final-cta-sub">
          Let&apos;s explore how technology can turn your ideas into meaningful solutions.
        </p>
      </div>

      <button
        type="button"
        className="btn-final-action"
        onClick={() => onOpenContact("Let's Build Together")}
      >
        <span>Let&apos;s Build Together</span>
        <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
};

