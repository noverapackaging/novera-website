# NOVERA — Website

This is the NOVERA marketing website: a fast, static, 4-language site
(French, English, Italian, Spanish) with a visual editor at `/admin` so
you can change text without touching code.

You do **not** need to know how to code to run or maintain this site day
to day. This README explains everything in plain language. Keep it —
future-you (or whoever helps you later) will want it.

---

## 1. What's in this project (folder structure)

```
novera-website/
├── src/
│   ├── content/           ← ALL THE WEBSITE TEXT LIVES HERE, as JSON files
│   │   ├── fr/             French text: home.json, services.json, footer.json, site.json
│   │   ├── en/              same 4 files, in English
│   │   ├── it/              same 4 files, in Italian
│   │   └── es/              same 4 files, in Spanish
│   ├── pages/
│   │   ├── [lang]/          the actual page templates (index = Home, services.astro = Services)
│   │   ├── 404.astro        "page not found" page
│   │   └── thanks.astro     shown after someone submits the contact form
│   ├── components/          reusable page pieces: Header, Footer, ContactForm, etc.
│   ├── layouts/             the shared page frame (header + footer + SEO tags)
│   ├── i18n/                small helper files for handling 4 languages
│   └── styles/global.css    fonts + global page background
├── public/
│   ├── admin/                the visual editor (config.yml = what fields you can edit)
│   ├── fonts/                the Satoshi font files
│   └── images/                logo, favicon (see section 6 below)
├── astro.config.mjs         site-wide settings (languages, site URL)
├── tailwind.config.mjs      ⭐ BRAND COLORS live here, in ONE place
├── netlify.toml             deployment settings for Netlify
└── README.md                 this file
```

**The rule to remember:** page templates (`.astro` files) control *layout*.
JSON files in `src/content/` control *text*. You will almost never need
to open a `.astro` file — the CMS at `/admin` edits the JSON files for you.

---

## 2. Running the site on your own computer

You only need this if you want to preview changes before they go live,
or if you're not using the CMS. Requires [Node.js](https://nodejs.org)
(version 18 or newer) installed once.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints (usually `http://localhost:4321`) in
your browser. Leave that terminal window running while you work; press
`Ctrl+C` to stop it.

---

## 3. Editing content in `/admin` (the visual editor)

Once the site is deployed to Netlify with Identity turned on (see the
checklist at the very end of this file), go to:

```
https://YOUR-SITE-NAME.netlify.app/admin
```

Log in, and you'll see collections on the left: **Home Page**,
**Services Page**, **Footer & Contact**, **Site Navigation**. Open one,
and you'll see tabs or fields for **FR / EN / IT / ES** side by side —
edit each language, then click **Save**, then **Publish**. Every visible
piece of text on the site — headlines, values, sectors, product
families, footer, legal mentions, button labels — is editable there.
Nothing is hardcoded in the page templates.

Changes go through a review step (a "draft" you can preview) before
going live — that's the `editorial_workflow` setting, so you can't
accidentally publish a typo straight to the live site.

---

## 4. Common edits

### Add a new product family / sector / value / service step
These are all "lists" in the CMS (e.g. Home Page → Product Families →
Items). Open the entry, click **Add item**, fill it in for all 4
languages, save and publish. **No code changes needed.**

### Add a brand-new language (5th locale)
This one *does* need a developer (or Claude) to touch code, in 5 places:
1. `astro.config.mjs` — add the language code to the `locales` array.
2. `src/i18n/locales.ts` — add the language code to `LOCALES` and give
   it a display name in `LOCALE_LABELS`.
3. `src/content/<newcode>/` — create `home.json`, `services.json`,
   `footer.json`, `site.json` (copy the English ones as a starting
   point and translate).
4. `public/admin/config.yml` — add the language code to `i18n.locales`.
5. Rebuild and redeploy.

### Change the brand colors or fonts
Colors: open `tailwind.config.mjs` — the six brand colors
(`deep-eucalyptus`, `sand`, `warm-ivory`, `bronze`, `graphite`, `sage`)
are defined once there and used everywhere on the site.

Fonts: see `src/styles/global.css`. Titles use **Satoshi** (already
included, self-hosted, free). Body text currently uses **Mulish** — a
free stand-in for Avenir Next Pro, which is a *paid* font we didn't buy
a license for. When you do buy one, there's a clearly marked comment in
`global.css` titled `>>> SWAP BODY FONT HERE <<<` explaining the 3 steps
to switch — it only needs to change in that one place.

---

## 5. Deploying (going live) with Netlify

1. Push this project to a GitHub repository (see checklist below).
2. In [Netlify](https://app.netlify.com), click **Add new site → Import
   an existing project**, and pick that GitHub repo. Netlify will read
   `netlify.toml` automatically (build command and publish folder are
   already set — you don't need to type anything).
3. Once deployed, go to **Site configuration → Identity** and click
   **Enable Identity**. Then **Identity → Services → Git Gateway**,
   click **Enable Git Gateway**. This is what lets `/admin` save changes
   back to GitHub without you needing a GitHub account yourself.
4. Under **Identity → Registration**, you can restrict sign-ups to
   invite-only (recommended).
5. Invite yourself: **Identity → Invite users**, enter your email, and
   accept the invite email to set a password.
6. Visit `https://YOUR-SITE-NAME.netlify.app/admin`, log in, and start
   editing.

---

## 6. Logo & favicon — files to replace

The site currently ships with **placeholder** graphics so nothing looks
broken. Replace them with your real assets, keeping the exact same
filenames so nothing else needs to change:

| Replace this file | With | Used for |
|---|---|---|
| `public/images/novera-wordmark.svg` | your primary logo/wordmark (SVG preferred, PNG also works if you update the filename in `src/components/Header.astro`) | Header logo |
| `public/images/favicon.svg` | your NVR emblem (SVG or PNG — if PNG, update the `<link rel="icon">` line in `src/layouts/BaseLayout.astro`) | Browser tab icon |
| `public/images/novera-og.jpg` | a 1200×630px image (add this file — it doesn't exist yet) | Preview image when the site is shared on social media / messaging apps |

You can drop files directly into `public/images/` via GitHub, or upload
them through the CMS's media picker once Identity/Git Gateway is set up
(any image field will let you browse `public/images/`).

---

## 7. Contact form

The contact form on the Services page uses **Netlify Forms** — no
backend, no database, no extra setup. Submissions appear automatically
in your Netlify dashboard under **Forms**, and you can turn on email
notifications there (Site configuration → Forms → Form notifications).

---

## Numbered checklist — what to do next

1. **Push this project to GitHub.** Create a new repository and push
   this folder to it (ask Claude to do this for you if you're not sure
   how).
2. **Connect Netlify.** In Netlify, "Add new site" → import that GitHub
   repository.
3. **Enable Identity.** Site configuration → Identity → Enable Identity.
4. **Enable Git Gateway.** Identity → Services → Git Gateway → Enable.
5. **Invite yourself as a CMS user.** Identity → Invite users → your
   email → accept the invite email → set a password.
6. **Add your real logo files** to `public/images/` (see section 6
   above) — replace the placeholders and keep the same filenames.
7. **Log in at `/admin`** and start refining the placeholder copy in
   all 4 languages.
8. *(Optional)* Connect a custom domain in Netlify's Domain settings,
   then update the `SITE_URL` constant at the top of `astro.config.mjs`
   to match, so SEO tags and the sitemap point at the right address.
