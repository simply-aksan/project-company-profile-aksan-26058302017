/**
 * Pure calculation utilities for REKAVANTA interactive behaviors:
 * 1. Scroll-driven word-by-word color transition with soft 3-word transition edge.
 * 2. Inquiry form validation logic.
 * 3. Active navigation section resolver.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export const INITIAL_WORD_RGB: RGB = { r: 0x6f, g: 0x6f, b: 0x6f }; // #6F6F6F (111, 111, 111)
export const COMPLETED_WORD_RGB: RGB = { r: 0xf4, g: 0xf4, b: 0xf4 }; // #F4F4F4 (244, 244, 244)

/**
 * Clamps a numeric value between min and max.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Computes normalized page scroll progress in [0..1] given current scrollY,
 * document scrollHeight, and viewport innerHeight.
 */
export function computePageScrollProgress(
  scrollY: number,
  docScrollHeight: number,
  viewportHeight: number
): number {
  const maxScroll = docScrollHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  return clamp(scrollY / maxScroll, 0, 1);
}

/**
 * Computes the interpolation factor [0..1] for a given word index in a total word count,
 * maintaining a soft transition edge across `edgeWidth` words (default 3).
 *
 * When progress = 0, all words have factor 0 (#6F6F6F).
 * When progress = 1, all words have factor 1 (#F4F4F4).
 */
export function computeWordRevealFactor(
  wordIndex: number,
  totalWords: number,
  progress: number,
  edgeWidth = 3
): number {
  if (totalWords <= 0) return 0;
  const clampedProgress = clamp(progress, 0, 1);
  if (clampedProgress <= 0) return 0;
  if (clampedProgress >= 1) return 1;

  const virtualPos = clampedProgress * (totalWords + edgeWidth);
  const rawFactor = (virtualPos - wordIndex) / edgeWidth;
  return clamp(rawFactor, 0, 1);
}

/**
 * Formats an interpolated RGB color string `rgb(r, g, b)` between #6F6F6F and #F4F4F4.
 */
export function interpolateWordColor(factor: number): string {
  const t = clamp(factor, 0, 1);
  if (t <= 0.001) return '#6F6F6F';
  if (t >= 0.999) return '#F4F4F4';
  const r = Math.round(INITIAL_WORD_RGB.r + (COMPLETED_WORD_RGB.r - INITIAL_WORD_RGB.r) * t);
  const g = Math.round(INITIAL_WORD_RGB.g + (COMPLETED_WORD_RGB.g - INITIAL_WORD_RGB.g) * t);
  const b = Math.round(INITIAL_WORD_RGB.b + (COMPLETED_WORD_RGB.b - INITIAL_WORD_RGB.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export interface InquiryInput {
  name: string;
  email: string;
  direction: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryInput, string>>;
}

/**
 * Validates the studio conversation / inquiry form inputs without silently substituting fallbacks.
 */
export function validateInquiryForm(input: InquiryInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryInput, string>> = {};
  const trimmedName = (input.name || '').trim();
  const trimmedEmail = (input.email || '').trim();
  const trimmedDirection = (input.direction || '').trim();
  const trimmedMessage = (input.message || '').trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid work or personal email address.';
  }

  if (!trimmedDirection) {
    errors.direction = 'Please select a business direction or initiative topic.';
  }

  if (trimmedMessage.length < 12) {
    errors.message = 'Please share a brief overview of your idea or requirements (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
