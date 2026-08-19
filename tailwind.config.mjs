/**
 * NOVERA brand tokens — defined ONCE here, used everywhere via Tailwind
 * utility classes (e.g. bg-warm-ivory, text-deep-eucalyptus, border-bronze).
 *
 * Usage rule: greens (deep-eucalyptus / sage) dominate, warm-ivory is the
 * page canvas, sand punctuates as a material accent, bronze is a rare,
 * premium accent (links, rules, small details) — never a background.
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'deep-eucalyptus': '#1E3D35',
        sand: '#C9BBA5',
        'warm-ivory': '#F3F0E9',
        bronze: '#A47B4F',
        graphite: '#262624',
        sage: '#6E7F69',
      },
      fontFamily: {
        // Titles / logo — self-hosted Satoshi (see src/styles/global.css)
        display: ['Satoshi', 'sans-serif'],
        // Body copy — Mulish stands in for Avenir Next Pro (a paid font we
        // don't have a license for yet). To switch to Avenir Next Pro once
        // you buy a web license, see the single comment in
        // src/styles/global.css marked "SWAP BODY FONT HERE".
        body: ['Mulish', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};
