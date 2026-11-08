import React, { useEffect } from 'react';
import { Initiative } from '../../types';

interface ProjectModalProps {
  isOpen: boolean;
  initiative: Initiative | null;
  onClose: () => void;
  onDiscuss: (initiative: Initiative) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  initiative,
  onClose,
  onDiscuss,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !initiative) return null;

  return (
    <div
      className="modal-backdrop is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="studio-dialog">
        <div className="dialog-top">
          <div>
            <div
              id="project-dialog-status"
              style={{ fontSize: '11px', color: '#7dafe0', letterSpacing: '0.1em' }}
            >
              {initiative.status}
            </div>
            <h3 id="project-dialog-title" style={{ fontSize: '22px', marginTop: '4px' }}>
              {initiative.title}
            </h3>
          </div>
          <button type="button" className="dialog-close" onClick={onClose}>
            Close ✕
          </button>
        </div>
        <div
          id="project-dialog-category"
          style={{ fontSize: '12.5px', color: '#a0a0a0', marginBottom: '12px' }}
        >
          {initiative.category}
        </div>
        <p
          id="project-dialog-description"
          style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#e4e4e4', marginBottom: '20px' }}
        >
          {initiative.desc}
        </p>
        <button
          type="button"
          className="btn-submit-modal"
          style={{ width: '100%' }}
          onClick={() => onDiscuss(initiative)}
        >
          Discuss This Initiative ↗
        </button>
      </div>
    </div>
  );
};

