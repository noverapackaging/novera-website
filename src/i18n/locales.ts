export const LOCALES = ['fr', 'en', 'it', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

// Labels shown in the language switcher — these are UI chrome (not page
// copy), so they live in code rather than the CMS. Change them here if
// you ever want the switcher to say something other than the native
// language name.
export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  it: 'Italiano',
  es: 'Español',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// Swaps the locale segment of a path, e.g. /fr/services/ -> /en/services/
export function swapLocale(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${nextLocale}/`;
  parts[0] = nextLocale;
  return `/${parts.join('/')}/`;
}
