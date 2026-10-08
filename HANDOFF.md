# NOVERA — Stato del progetto e passaggio su un altro Mac

Ultimo aggiornamento: ottobre 2026.
Documento di consegna: dove sta il sito, cosa è stato fatto, cosa manca,
e come ripartire da un'altra macchina. Per l'uso quotidiano vedi `README.md`.

---

## 1. Coordinate

| Cosa | Dove |
|---|---|
| Sito online | https://sensational-salamander-a5f064.netlify.app (`/fr/`, `/en/`, `/it/`, `/es/`) |
| Codice | https://github.com/noverapackaging/novera-website (privato, branch `main`) |
| Hosting | Netlify — progetto `sensational-salamander-a5f064`, site ID `b72cd6bb-f94c-43a2-af97-fb6c1ef868bb` |
| Account GitHub | `noverapackaging` |
| Account Netlify | andrea@noverapackaging.com |
| Dominio da collegare | `noverapackaging.com` (registrato su OVH) — **non ancora collegato** |

**Pubblicazione automatica**: ogni `git push` su `main` fa ripartire la build su
Netlify e il sito si aggiorna da solo in circa un minuto.

---

## 2. Cosa c'è nel sito

Due pagine (Home e Servizi) in **quattro lingue** — FR (default), EN, IT, ES —
con selettore lingua, form contatti (Netlify Forms), SEO completa (hreflang,
sitemap, Open Graph), pagina 404 e pagina di ringraziamento.

**Contenuti**
- Testi definitivi nelle 4 lingue, presi dal documento `NOVERA_Sito_Testi_4lingue.md`
  e poi riscritti per scorrevolezza (frasi intere invece di elenchi di sostantivi).
- Settori: **Spirits · Vino · Épicerie fine** (FR) / **Gourmet** (IT, ES) / **Gourmet food** (EN).
- Famiglie prodotto: **Vetro · Tappi · Capsule · Design & décor**
  (le teste in legno stanno dentro Tappi, non sono una famiglia separata).
- Dati legali reali dal Kbis: NOVERA SAS, capitale 1.000 €, RCS Lyon 993 491 729,
  TVA FR43993491729, sede 30 Avenue Maréchal Foch, Bureau 3, 69006 Lyon.
- Contatti: contact@noverapackaging.com, +33 7 81 99 32 48, +1 (305) 954-6828.

**Immagini** (`public/images/`)
- `hero-bottle.jpg` — **foto reale** della bottiglia al forno in vetreria. Vale più
  di qualsiasi immagine generata: non sostituirla senza un buon motivo.
- Le altre otto sono immagini generate su misura nella direzione artistica del brand
  (avorio, sabbia, eucalipto, bronzo; luce laterale morbida; macro sulla materia).
- Logo e favicon sono gli originali dalla cartella Brand. Il file del wordmark aveva
  una `&` non codificata che rompeva l'SVG: **è corretta solo nella copia del sito**,
  non nel file originale su iCloud.

---

## 3. Da fare

1. **Collegare il dominio** `noverapackaging.com` da OVH (Netlify → Domain settings →
   Add custom domain, poi i record DNS su OVH). Dopo, aggiornare `SITE_URL` in
   `astro.config.mjs` e l'indirizzo in `public/robots.txt`.
2. **Rinominare il sito** su Netlify (Site configuration → Change site name), così il
   link intanto è leggibile, es. `novera-packaging.netlify.app`. Se lo rinomini,
   aggiorna anche `SITE_URL` e `robots.txt`.
3. **Pannello `/admin` non attivo.** La pagina si apre ma il login non funziona:
   Netlify Identity non è attivabile su questo sito (Netlify lo sta dismettendo per i
   siti nuovi). Finché non si configura un'alternativa, i testi si modificano
   dal codice. Tutto il contenuto sta comunque nei file JSON in `src/content/<lingua>/`,
   quindi è modificabile senza toccare i componenti.
4. **Foto reali** al posto delle immagini generate, quando ce ne sono di produzione,
   chiusure o prodotti finiti. Basta sostituire il file mantenendo lo stesso nome.

---

## 4. Ripartire da un altro Mac

Tutto il lavoro è su GitHub: **niente è bloccato sul Mac di origine** tranne le
credenziali, che si rifanno in pochi minuti.

### Serve installare

1. **Node.js** (versione 18 o più recente) da https://nodejs.org
2. **Il progetto**:
   ```bash
   cd ~ && git clone https://github.com/noverapackaging/novera-website.git
   cd novera-website && npm install
   npm run dev     # anteprima su http://localhost:4321
   ```
3. **GitHub CLI** — serve per autenticare i `git push` senza password.
   Scarica il binario per Mac (Apple Silicon) da https://github.com/cli/cli/releases,
   mettilo in `~/bin/gh`, poi:
   ```bash
   ~/bin/gh auth login --hostname github.com --git-protocol https --web
   ~/bin/gh auth setup-git     # <-- senza questo, git push non trova le credenziali
   ```
   Il login è a codice: si apre una pagina GitHub dove si incolla un codice usa e getta.
4. **Netlify CLI** (opzionale, serve solo per cambiare impostazioni del sito da terminale):
   ```bash
   npm install --prefix ~/.netlify-cli netlify-cli
   ~/.netlify-cli/node_modules/.bin/netlify login
   ```

### Da sapere

- La cartella Brand (loghi, brand book) sta su **iCloud Drive**, in
  `#1 AUBOULEAU/#3 NOVERA/Marketing/Brand/` — si sincronizza da sola se il Mac mini
  usa lo stesso account iCloud.
- Se usi l'anteprima dall'app Claude, ricrea `~/.claude/launch.json` con il percorso
  del progetto sulla nuova macchina (contiene un percorso assoluto).
- `node_modules/` e `dist/` non sono nel repo: li ricrea `npm install` e `npm run build`.

### Pubblicare una modifica

```bash
cd ~/novera-website
npm run build          # controlla che compili
git add -A && git commit -m "descrizione" && git push
```
Netlify fa il resto.

---

## 5. Dove sta cosa

- `src/content/<lingua>/` — **tutti i testi**: `home.json`, `services.json`,
  `footer.json`, `site.json`. Nessuna stringa visibile è scritta nei componenti.
- `public/images/` — immagini, logo, favicon.
- `tailwind.config.mjs` — i sei colori del brand, definiti una volta sola.
- `src/styles/global.css` — i font. Satoshi per i titoli (self-hosted); il testo usa
  Mulish come sostituto gratuito di Avenir Next Pro, con un commento
  `>>> SWAP BODY FONT HERE <<<` che spiega come cambiarlo se compri la licenza.
- `src/pages/[lang]/` — le due pagine. `astro.config.mjs` — lingue e indirizzo del sito.
