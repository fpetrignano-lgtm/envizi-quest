# GitHub + GitHub Pages — setup plan

## Overview

Obiettivo: rendere [`envizi-quest`](envizi-quest) aggiornabile nel tempo con un flusso semplice e sicuro basato su GitHub e GitHub Pages, riducendo al minimo il rischio di errori futuri.

Ambito del piano:
- aggiungere un file [`envizi-quest/.gitignore`](envizi-quest/.gitignore)
- rimuovere dal repository gli artefatti generati e i file locali non adatti al versionamento
- preparare il repository per GitHub Pages
- aggiornare la documentazione operativa in [`envizi-quest/source/README.md`](envizi-quest/source/README.md)

Approccio:
- mantenere [`envizi-quest/source`](envizi-quest/source) come unica fonte di verità
- evitare cambi non richiesti a dipendenze, architettura o configurazione build già funzionante
- documentare il nuovo flusso in modo che la prossima sessione parta senza ambiguità

## Sub-task 1

### Intent
Mettere in sicurezza il repository impedendo il versionamento futuro di dipendenze installate, build generate e metadata locali.

### Expected Outcomes
- esiste un file [`envizi-quest/.gitignore`](envizi-quest/.gitignore)
- [`envizi-quest/source/node_modules`](envizi-quest/source/node_modules), [`envizi-quest/source/dist`](envizi-quest/source/dist) e [`envizi-quest/dist`](envizi-quest/dist) non sono più candidati naturali al commit
- la struttura del repository è più adatta a GitHub

### Todo List
1. creare [`envizi-quest/.gitignore`](envizi-quest/.gitignore) con regole per `node_modules`, cartelle `dist` e file locali di sistema
2. verificare quali directory generate risultano oggi presenti nel progetto
3. rimuovere dal repository gli artefatti generati che non devono essere mantenuti sotto versione
4. ricontrollare che restino versionati solo i file sorgente, gli asset necessari e la configurazione utile al build

### Relevant Context
- [`envizi-quest/source/package.json`](envizi-quest/source/package.json)
- [`envizi-quest/source/README.md`](envizi-quest/source/README.md)
- cartelle generate osservate: [`envizi-quest/source/node_modules`](envizi-quest/source/node_modules), [`envizi-quest/source/dist`](envizi-quest/source/dist), [`envizi-quest/dist`](envizi-quest/dist)

### Status
[x] done

## Sub-task 2

### Intent
Preparare il repository al deploy su GitHub Pages mantenendo il setup minimo già compatibile con l'app React/Vite esistente.

### Expected Outcomes
- il repository contiene solo ciò che serve per buildare l'app da [`envizi-quest/source`](envizi-quest/source)
- il deploy automatico da GitHub Actions a GitHub Pages può essere configurato senza workaround locali

### Todo List
1. configurare il workflow GitHub Actions in [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)
2. confermare che il build parta da [`envizi-quest/source/package.json`](envizi-quest/source/package.json) con la directory `source` come base di lavoro
3. eliminare la dipendenza operativa dal mirror manuale in [`envizi-quest/dist`](envizi-quest/dist) dentro la documentazione e nel flusso consigliato
4. annotare nel piano operativo i parametri del workflow: base directory `source`, build command `npm run build`, publish directory `dist`

### Relevant Context
- [`envizi-quest/source/package.json`](envizi-quest/source/package.json)
- mirror storico di deploy: [`envizi-quest/dist`](envizi-quest/dist)

### Status
[x] done

### GitHub Pages parameters
- **Workflow**: `.github/workflows/deploy-pages.yml`
- **Build command**: `npm run build`
- **Publish directory**: `source/dist`
- **Base path Vite**: `/envizi-quest/`

## Sub-task 3

### Intent
Aggiornare la documentazione per evitare che nelle prossime sessioni si usi un flusso locale o manuale non più necessario.

### Expected Outcomes
- [`envizi-quest/source/README.md`](envizi-quest/source/README.md) descrive chiaramente la fonte di verità
- [`envizi-quest/source/README.md`](envizi-quest/source/README.md) spiega il nuovo flusso GitHub + GitHub Pages
- le istruzioni obsolete sul copia-incolla manuale dei build artifacts vengono rimosse o declassate a nota storica

### Todo List
1. aggiornare la sezione struttura e comandi in [`envizi-quest/source/README.md`](envizi-quest/source/README.md)
2. chiarire che si modifica solo [`envizi-quest/source/src/App.tsx`](envizi-quest/source/src/App.tsx) e [`envizi-quest/source/src/styles.css`](envizi-quest/source/src/styles.css)
3. aggiungere una sezione sintetica con il flusso raccomandato: sviluppo locale, commit su GitHub, deploy automatico GitHub Pages
4. aggiornare lo stato attuale per riflettere il nuovo setup minimo

### Relevant Context
- [`envizi-quest/source/README.md`](envizi-quest/source/README.md)
- file sorgente principali: [`envizi-quest/source/src/App.tsx`](envizi-quest/source/src/App.tsx), [`envizi-quest/source/src/styles.css`](envizi-quest/source/src/styles.css)

### Status
[x] done

## Sub-task 4

### Intent
Validare che il repository ripulito e documentato sia pronto per essere pubblicato da GitHub Pages senza regressioni applicative.

### Expected Outcomes
- la build locale continua a funzionare
- il repository è coerente con il flusso descritto nella documentazione
- restano solo i cambi strettamente necessari al setup minimo richiesto

### Todo List
1. eseguire la build da [`envizi-quest/source`](envizi-quest/source)
2. verificare che i file di configurazione e documentazione siano coerenti tra loro
3. controllare che il repository non dipenda più da cartelle generate per il flusso di pubblicazione previsto
4. preparare un breve riepilogo operativo per il deploy su GitHub Pages

### Relevant Context
- [`envizi-quest/source/package.json`](envizi-quest/source/package.json)
- [`envizi-quest/source/README.md`](envizi-quest/source/README.md)

### Status
[x] done

### Validation results (Sub-task 4)
- **Build locale**: ✓ `npm run build` completes in ~87ms, zero warnings — `dist/index.html`, `dist/assets/*.css`, `dist/assets/*.js` generati correttamente
- **Coerenza configurazione**:
  - `package.json` → `"build": "vite build"` ✓
  - `deploy-pages.yml` → workflow GitHub Actions configurato ✓
  - `README.md` → flusso deploy e regole allineati ✓
- **Dipendenze da cartelle generate**: nessuna — `envizi-quest/dist` non compare in nessun flusso prescrittivo; `.gitignore` copre `source/dist/`, `dist/` e `source/node_modules/`
- **Pronto per GitHub Pages**: sì — vedi riepilogo operativo sotto

### Riepilogo operativo (deploy GitHub Pages)

**Prerequisiti**
1. Il repository è pubblicato su GitHub.
2. GitHub Pages è abilitato con source `GitHub Actions`.

**Flusso di aggiornamento**
```bash
# 1. Modifica source/src/App.tsx o source/src/styles.css
# 2. Commit e push
git add .
git commit -m "descrizione della modifica"
git push

# → GitHub Actions rileva il push, installa le dipendenze in source/, esegue npm run build
# → GitHub Pages pubblica automaticamente il contenuto di source/dist
# Nessun passo manuale necessario.
```

**Verifica locale opzionale prima del push**
```bash
cd envizi-quest/source
npm run build   # deve completare senza errori
```

**URL sito**: https://fpetrignano-lgtm.github.io/envizi-quest/
