import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SakugaButtonElement extends HTMLElement {
  disabled: boolean;
  impact: () => void;
  done: (holdSeconds?: number) => void;
}

export interface SakugaTabsElement extends HTMLElement {
  selected: number;
  value: string;
}

export interface SakugaToggleElement extends HTMLElement {
  checked: boolean;
  disabled: boolean;
}

export interface SakugaSliderElement extends HTMLElement {
  value: string;
  valueAsNumber: number;
}

export interface SakugaInputElement extends HTMLElement {
  value: string;
}

export interface SakugaToastElement extends HTMLElement {
  show: (text?: string) => void;
  hide: () => void;
}

type SakugaProps<T extends HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'sakuga-button': SakugaProps<SakugaButtonElement> & {
        variant?: 'primary' | 'secondary';
        disabled?: boolean;
        type?: 'button' | 'submit';
      };
      'sakuga-tabs': SakugaProps<SakugaTabsElement> & {
        label?: string;
        selected?: number | string;
      };
      'sakuga-toggle': SakugaProps<SakugaToggleElement> & {
        label?: string;
        checked?: boolean;
        disabled?: boolean;
      };
      'sakuga-slider': SakugaProps<SakugaSliderElement> & {
        label?: string;
        value?: string | number;
        min?: string | number;
        max?: string | number;
        step?: string | number;
        unit?: string;
      };
      'sakuga-input': SakugaProps<SakugaInputElement> & {
        label?: string;
        placeholder?: string;
        value?: string;
        type?: string;
      };
      'sakuga-toast': SakugaProps<SakugaToastElement> & {
        duration?: string | number;
        message?: string;
      };
    }
  }
}
