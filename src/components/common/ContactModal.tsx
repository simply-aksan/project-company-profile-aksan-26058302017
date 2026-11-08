import React, { useState, useEffect } from 'react';
import { InquiryFormData } from '../../types';

interface ContactModalProps {
  isOpen: boolean;
  subjectTitle?: string;
  defaultDirection?: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  subjectTitle = 'Start a Conversation',
  defaultDirection = '',
  onClose,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    direction: defaultDirection,
    message: '',
  });

  const [errors, setErrors] = useState<Partial<InquiryFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultDirection) {
      setFormData((prev) => ({ ...prev, direction: defaultDirection }));
    }
  }, [defaultDirection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Partial<InquiryFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.direction) newErrors.direction = 'Please select a business direction';
    if (!formData.message.trim()) newErrors.message = 'Please provide a project brief';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', direction: '', message: '' });
      onClose();
    }, 2800);
  };

  return (
    <div
      className="modal-backdrop is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="studio-dialog">
        <div className="dialog-top">
          <div>
            <div style={{ fontSize: '11px', color: '#7dafe0', letterSpacing: '0.1em' }}>
              REKAVANTA STUDIO
            </div>
            <h3 id="contact-dialog-title" style={{ fontSize: '22px', marginTop: '4px' }}>
              {subjectTitle}
            </h3>
          </div>
          <button type="button" className="dialog-close" onClick={onClose}>
            Close ✕
          </button>
        </div>

        {isSubmitted ? (
          <div style={{ padding: '24px 0' }}>
            <div style={{ fontWeight: 600, color: '#7dafe0', marginBottom: '8px', fontSize: '16px' }}>
              ✓ Inquiry Logged for Review
            </div>
            <p style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: 1.6 }}>
              Thank you, {formData.name}. Our studio team has received your message regarding &ldquo;{formData.direction}&rdquo; and will respond promptly.
            </p>
          </div>
        ) : (
          <form className="form-stack" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="inquiry-name" className="form-label">
                Your Name
              </label>
              <input
                id="inquiry-name"
                type="text"
                className="form-control"
                placeholder="e.g. Alex Henderson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="inquiry-email" className="form-label">
                Work Email
              </label>
              <input
                id="inquiry-email"
                type="email"
                className="form-control"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="inquiry-direction" className="form-label">
                Business Direction
              </label>
              <select
                id="inquiry-direction"
                className="form-control"
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
              >
                <option value="">Select a direction...</option>
                <option value="Digital Services">Digital Services — Custom Software &amp; AI</option>
                <option value="Digital Products">Independent Digital Products</option>
                <option value="Selected Initiatives">Selected Initiatives Inquiry</option>
              </select>
              {errors.direction && <span className="field-error">{errors.direction}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="inquiry-message" className="form-label">
                Project Brief
              </label>
              <textarea
                id="inquiry-message"
                className="form-control"
                rows={3}
                placeholder="Tell us about your project or idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn-submit-modal">
              Send Studio Inquiry ↗
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

