# Calculemus — atlante ipermediale dell'informatica

Atlante navigabile a grafo dell'informatica come campo storico-concettuale: dalla
logica alla macchina, dai linguaggi alle reti, dall'intelligenza artificiale alle
sue conseguenze sociali. **170 voci collegate a grafo** — aree, concetti,
algoritmi, linguaggi, sistemi, persone, opere, eventi, luoghi — in sei parti,
dove la struttura ipertestuale è la modalità primaria di esplorazione e ogni
vista grafica ha un equivalente testuale accessibile.

Le **priorità contese e le attribuzioni della vulgata** (ENIAC/ABC/Z3, il
Colossus «di Turing», l'eponimo di von Neumann sul First Draft…) sono una feature
concettuale centrale: archi `attribuzione_infondata` tratteggiati, spenti di
default, ognuno con la nota che riporta ciò che la storiografia documenta.

Il sito è un'istanza del motore **Correspondentia** (la fabbrica:
[grafy](https://github.com/FrancescoCorbosiero/grafy)), generata dal seme in
`kit/seme.json`.

## Viste

| Rotta | Contenuto |
|---|---|
| `/grafo` | Vista 2D principale (Sigma.js): filtri, slider temporale con riproduzione, ego-network, cluster, stato in query string |
| `/grafo/elenco` | Fallback accessibile: tabella completa ordinabile e filtrabile |
| `/relazioni` | Il grafo in forma di testo: liste di adiacenza per voce (archi, note, collocazioni) con filtri progressivi |
| `/relazioni/archi` | Tavola completa e ordinabile di tutti gli archi, attribuzioni infondate contrassegnate |
| `/tempo` | Timeline a corsie con zoom semantico, sincronizzata col grafo |
| `/voce/[id]` | Dossier statico: sommario, corpo, archi con note, fonti, mini-grafo ego |
| `/percorso/[slug]` | 4 percorsi d'autore con mappa del cammino sincronizzata allo scroll |
| `/percorsi/trova` | Cammino minimo fra due voci, reso come catena di frasi |
| `/algoritmi` | Atlante degli algoritmi: le procedure con nome e storia propria, con le loro relazioni |
| `/diagrammi` | Macchina di Turing, gerarchia di Chomsky, scala delle astrazioni, mappa della complessità |
| `/leggi` | Il volume lineare, capitolo per capitolo, con progressione di lettura |
| `/cerca` | Full-text FlexSearch; palette globale con `Ctrl/Cmd+K` |
| `/studio` | Il registro locale dell'apprendimento: copertura per parte e per peso, autovalutazioni, percorsi e volume — nel browser, sincronizzato fra le tab |

## Architettura dei dati (fonte unica)

Il motore è **seed-native**: la tassonomia (tipi di nodo e di arco, etichette,
archi derivati e leggendari, parti) non è scritta nel codice ma **generata** da
`kit/seme.json` come primo passo della pipeline. Il grafo **non** è un file
parallelo al contenuto: viene derivato a build time dal frontmatter delle voci
in `src/content/voci/` (una voce = un nodo; gli archi sono dichiarati nella voce
di partenza; gli archi di contenimento parte→voce sono derivati dal campo
`parte`).

```
kit/seme.json ───────────▶ scripts/genera-costanti.ts ─▶ src/generated/costanti.ts (tassonomia)
     (tassonomia, parti)      · tipi statici (as const)   src/generated/parti.css (colori parte)
src/content/voci/*.md ──▶ scripts/build-data.ts ──▶ src/generated/graph.json (pagine statiche)
     (frontmatter Zod)        · validazioni bloccanti     public/data/graph.json (viste client)
                              · layout ForceAtlas2        public/data/ricerca-*.json (indici)
                                deterministico
contenuti/*.md ──────────▶ scripts/build-capitoli.ts ──▶ src/generated/capitoli/ (per /leggi)
```

Validazioni che **fermano la build**: riferimenti pendenti, archi duplicati o
riflessivi, cicli nel contenimento, nodi non raggiungibili, archi leggendari
senza nota, link interni a voci inesistenti, id non kebab-case, tipi o parti
fuori dalla tassonomia del seme.

## Comandi

```bash
npm run dev        # pipeline dati + server di sviluppo
npm run build      # pipeline dati + build statica in dist/
npm test           # pipeline dati + Vitest (schema, invarianti grafo, palette, URL)
npm run test:e2e   # Playwright: i percorsi utente critici
npm run data       # solo la pipeline dati
node scripts/verifica-bundle.mjs   # budget: home < 200 KB gzip (dopo build)
```

## Qualità

- **Accessibilità**: ogni vista grafica ha l'alternativa testuale; navigazione
  completa da tastiera; `prefers-reduced-motion` rispettato; i sei colori di
  parte sono verificati in deuteranopia **da un test automatico** (matrici di
  Machado in `tests/unit/palette-deuteranopia.test.ts`).
- **Performance**: librerie grafo caricate solo sulle rotte che le usano; budget
  bundle della home < 200 KB gzip verificato in CI; nessuna chiamata di rete a
  runtime (font self-hosted, indici pre-generati).
- **Contenuti**: le priorità contese sono presentate come contese, mai risolte
  d'ufficio; le vulgate e i miti fondativi sono raccontati e marcati come tali;
  le figure cancellate dal racconto corrente sono restituite alla storia; ogni
  voce cita in calce letteratura reale; crittografia e sicurezza sono descritte
  storicamente e concettualmente, senza istruzioni operative.
- **Apprendimento**: il registro di studio (`/studio`, `src/lib/studio.ts`)
  traccia consultazioni, letture e autovalutazioni per voce, percorso e
  capitolo, tutto in `localStorage` (niente account né server).

## Deploy

GitHub Pages via Actions (`.github/workflows/deploy.yml`, attivo sul ramo
`main`): in **Settings → Pages** impostare *Source: GitHub Actions*. Il sito è
configurato per `https://francescocorbosiero.github.io/calculemus/` (base path
in `astro.config.mjs`). La CI (`ci.yml`) esegue test unitari, build, budget
bundle ed e2e.

## Replica per altri argomenti

Il contenuto è separabile in un **seme** (JSON con tassonomia, parti, voci,
archi, regole) da cui un progetto gemello su un altro argomento-nodo può essere
generato e costruito: basta mettere il seme in `kit/seme.json` ed eseguire
`npm run data`. Il flusso in tre passi — genera il seme, valida il seme,
costruisci il sito con Claude Code — è documentato in
**[`kit/LEGGIMI.md`](kit/LEGGIMI.md)**. Il seme di questo stesso sito, estratto
dal contenuto reale e verificato in CI, è in `kit/esempio/seme-informatica.json`.
