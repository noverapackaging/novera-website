import { getEntry } from 'astro:content';
import type { Locale } from './locales';

// Thin wrapper so pages/components don't need to know about
// astro:content's collection-per-locale shape. Usage:
//   const home = await getPageContent(lang, 'home');
//   home.hero.headline
export async function getPageContent(locale: Locale, page: 'home' | 'services' | 'footer' | 'site') {
  const entry = await getEntry(locale, page);
  if (!entry) {
    throw new Error(`Missing content file: src/content/${locale}/${page}.json`);
  }
  return entry.data as any;
}
