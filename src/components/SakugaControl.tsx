import { ReactNode, useEffect, useRef } from 'react';
import type {
  SakugaButtonElement,
  SakugaInputElement,
  SakugaSliderElement,
  SakugaTabsElement,
  SakugaToggleElement,
} from '../types/sakuga';

interface SakugaBtnProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: (done: () => void) => void;
  ariaLabel?: string;
}

export function SakugaBtn({
  children,
  variant = 'primary',
  className = 'sakuga-studio',
  onClick,
  ariaLabel,
}: SakugaBtnProps) {
  const ref = useRef<SakugaButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !onClick) return;
    const handler = () => {
      onClick(() => {
        el.done?.(1.8);
      });
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [onClick]);

  return (
    <sakuga-button
      ref={ref}
      variant={variant}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </sakuga-button>
  );
}

interface SakugaTabOption {
  value: string;
  label: string;
}

interface SakugaTabsControlProps {
  label: string;
  options: SakugaTabOption[];
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
}

export function SakugaTabsControl({
  label,
  options,
  selectedIndex,
  onSelectIndex,
}: SakugaTabsControlProps) {
  const ref = useRef<SakugaTabsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.selected !== selectedIndex) {
      el.selected = selectedIndex;
    }
  }, [selectedIndex]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<{ index?: number }>;
      if (typeof ce.detail?.index === 'number') {
        onSelectIndex(ce.detail.index);
      }
    };
    el.addEventListener('change', onChange);
    return () => el.removeEventListener('change', onChange);
  }, [onSelectIndex]);

  return (
    <sakuga-tabs ref={ref} label={label} selected={selectedIndex}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </sakuga-tabs>
  );
}

interface SakugaToggleControlProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SakugaToggleControl({
  label,
  checked,
  onChange,
}: SakugaToggleControlProps) {
  const ref = useRef<SakugaToggleElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      onChange(Boolean(el.checked));
    };
    el.addEventListener('change', handler);
    return () => el.removeEventListener('change', handler);
  }, [onChange]);

  return (
    <sakuga-toggle
      ref={ref}
      label={label}
      checked={checked || undefined}
      style={{ margin: '18px 8px 6px', filter: 'hue-rotate(138deg) saturate(1.18)' }}
    />
  );
}

interface SakugaSliderControlProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onChange: (val: number) => void;
}

export function SakugaSliderControl({
  label,
  value,
  min = 0,
  max = 100,
  unit = '%',
  onChange,
}: SakugaSliderControlProps) {
  const ref = useRef<SakugaSliderElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      const next = Number(el.value);
      if (!Number.isNaN(next)) onChange(next);
    };
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
    return () => {
      el.removeEventListener('input', handler);
      el.removeEventListener('change', handler);
    };
  }, [onChange]);

  return (
    <sakuga-slider
      ref={ref}
      label={label}
      value={String(value)}
      min={String(min)}
      max={String(max)}
      unit={unit}
      style={{ display: 'block', width: '100%', margin: '26px 0 0' }}
    />
  );
}

interface SakugaInputControlProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

export function SakugaInputControl({
  label,
  placeholder,
  value,
  onChange,
}: SakugaInputControlProps) {
  const ref = useRef<SakugaInputElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.value !== value) el.value = value;
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      onChange(el.value || '');
    };
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
    return () => {
      el.removeEventListener('input', handler);
      el.removeEventListener('change', handler);
    };
  }, [onChange]);

  return (
    <sakuga-input
      ref={ref}
      label={label}
      placeholder={placeholder}
      value={value}
      style={{ display: 'block', width: '100%' }}
    />
  );
}
