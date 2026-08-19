import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// One collection per locale. Every JSON file inside src/content/<locale>/
// becomes an entry (home, services, footer, site). Decap CMS writes to
// these exact same files, so editing in /admin updates this content
// directly — no build schema to fight with.
const localeCollection = (locale: string) =>
  defineCollection({
    loader: glob({ pattern: '*.json', base: `./src/content/${locale}` }),
  });

export const collections = {
  fr: localeCollection('fr'),
  en: localeCollection('en'),
  it: localeCollection('it'),
  es: localeCollection('es'),
};
