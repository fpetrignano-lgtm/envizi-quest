# Envizi Impact Quest — Fonte di verità

## Struttura

```
envizi-quest/
└── source/               ← UNICA FONTE DI VERITÀ — modifica solo qui
    ├── src/
    │   ├── App.tsx       ← tutto il codice dell'app
    │   └── styles.css    ← tutto il CSS
    ├── public/
    │   ├── *.png         ← immagini degli scenari (versioni chiare/luminose)
    │   └── characters/   ← ritratti Marco e Luisa (neutral/thoughtful/success/negative)
    ├── dist/             ← generato da `npm run build`, NON modificare manualmente
    └── package.json
```

`envizi-quest/source` è l'**unica fonte di verità**. Il deploy avviene automaticamente tramite GitHub Pages (vedi sezione Flusso di deploy).

## Comandi

```bash
cd envizi-quest/source

# Sviluppo locale con hot-reload
npm run dev

# Anteprima del build (come Netlify)
npm run build && npx vite preview --port 4173
# → apri http://localhost:4173

# Build standalone (senza deploy)
npm run build
```

## Immagini degli scenari

Ogni missione ha 3 immagini (A=Envizi, B=Intermedia, C=AS-IS).  
Le versioni originali luminose sono su **Desktop/gymprolux/immagini/**.  
Sono già copiate in `source/public/` con questi nomi:

| File in public/                    | Missione          | Esito    |
|------------------------------------|-------------------|----------|
| envizi-data-automation.png         | 0 · Dati          | A Envizi |
| envizi-manual-forms.png            | 0 · Dati          | B Form   |
| envizi-spreadsheets-email.png      | 0 · Dati          | C AS-IS  |
| energy-envizi-analytics.png        | 1 · Energia       | A Envizi |
| energy-manual-dashboard.png        | 1 · Energia       | B Intermd|
| energy-asis-fragmented.png         | 1 · Energia       | C AS-IS  |
| supply-chain-envizi.png            | 2 · Supply Chain  | A Envizi |
| supply-chain-portal.png            | 2 · Supply Chain  | B Portale|
| supply-chain-asis.png              | 2 · Supply Chain  | C AS-IS  |
| reporting-envizi.png               | 3 · Reporting     | A Envizi |
| reporting-intermediate.png         | 3 · Reporting     | B Intermd|
| reporting-asis.png                 | 3 · Reporting     | C AS-IS  |
| planning-envizi.png                | 4 · Net Zero      | A Envizi |
| planning-intermediate.png          | 4 · Net Zero      | B Statica|
| planning-asis.png                  | 4 · Net Zero      | C AS-IS  |

## Flusso di deploy (GitHub Pages)

1. Modifica `source/src/App.tsx` o `source/src/styles.css`
2. `git add . && git commit -m "descrizione" && git push`
3. GitHub Actions builda automaticamente il progetto da `source/` con `npm ci && npm run build`
4. GitHub Pages pubblica il contenuto generato di `source/dist`

**Configurazione GitHub Pages**:
- Source: `GitHub Actions`
- Workflow: [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)
- Base path Vite: `/envizi-quest/`

## Regole

- **Non modificare** `dist/` manualmente — viene sempre rigenerato da `npm run build`
- **Non tenere** copie di App.tsx o styles.css fuori da `source/src/`
- **Non usare** `cp -r dist/* ../dist/` — il mirror manuale in `envizi-quest/dist/` non è più il meccanismo di deploy
- **Desktop/gymprolux/immagini/** è l'archivio delle immagini originali — non va toccato
- Dopo ogni sessione di sviluppo, il Desktop viene sincronizzato automaticamente da Bob

## Stato attuale (ultima sincronizzazione)

- Trust score baseline: 30
- Missione 0 (Fabbrica dei dati) Envizi: **+25** · altre missioni Envizi +15 · Intermedia +7 · Rimandare 0
- Schermata **trust** attiva (tra compare e esito): grafico SVG evoluzione + trust panel + lettura CdA
- Schermata Compare: lettere C/B/A rimosse — rimane solo "✓ La tua scelta" sulla card scelta
- Meccanica locked: opzione Envizi bloccata se missione 0 non è positiva
- Immagini: versioni luminose (chiare) per tutti e 5 gli scenari
- Overlay characterStage: rgba(4,12,9,.55) — ridotto per visibilità immagini
- Ultima slide: email contatto rimossa da [`nextContactEmail`](src/App.tsx)
- CSS sorgente pulito: rimossa direttiva Tailwind non utilizzata da [`styles.css`](src/styles.css) per evitare warning inutili in build
