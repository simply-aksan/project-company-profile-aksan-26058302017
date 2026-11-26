/**
 * Synchronizes Sakuga VFX shared canvas drawing palette (puffs, starbursts,
 * crystals, slashes, lettering) to AksanLab's Warm Stone & Terracotta system.
 */
export function applyAksanSakugaTheme(): void {
  const win = window as unknown as {
    SakugaFX?: {
      P?: {
        fill: string;
        shade: string;
        line: string;
        accent: string;
        ink: string;
        sfx: [string, string];
      };
    };
  };

  if (win.SakugaFX?.P) {
    Object.assign(win.SakugaFX.P, {
      fill: '#FAF8F3',
      shade: '#F2B8A2',
      line: '#161920',
      accent: '#E85427',
      ink: '#161920',
      sfx: ['#161920', '#FAF8F3'],
    });
  }
}
