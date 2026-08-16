/**
 * /leggi — modalità lineare (§5.10): trasforma i file del volume in
 * contenuti/ nei capitoli di src/generated/capitoli, ripulendo il LaTeX
 * (ambienti nota, \newpage, la mappa TikZ, le definition list del glossario)
 * e lasciando il testo altrimenti verbatim. Parità di contenuto: nulla del
 * volume va perso, la mappa TikZ è sostituita dal rimando al grafo vivo.
 *
 * Uso: tsx scripts/build-capitoli.ts (agganciato a `npm run data`).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { N_PARTI, NOMI_PARTE, NOMI_PARTE_BREVI } from '../src/lib/costanti';

const RADICE = resolve(import.meta.dirname ?? '.', '..');
const DIR_SORGENTE = join(RADICE, 'contenuti');
const DIR_USCITA = join(RADICE, 'src/generated/capitoli');

interface Capitolo {
  slug: string;
  ordine: number;
  titolo: string;
  sottotitolo?: string;
  /** file sorgente (concatenati) */
  sorgenti: string[];
  /** se presente, tiene solo la sezione dal h1 col titolo dato (per file multi-capitolo) */
  daH1?: string;
  aH1?: string;
}

/** Slug ascii-kebab dal nome breve della parte (es. "Sistemi e reti" → "sistemi-e-reti"). */
function slugifica(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Il volume segue le parti del seme: un capitolo introduttivo
 * ("come usare questo volume", 00_intro.md) più un capitolo per parte
 * (01_parte1.md … 0N_parteN.md), con titoli da NOMI_PARTE (generati).
 */
const CAPITOLI: Capitolo[] = [
  { slug: 'come-usare-questo-volume', ordine: 0, titolo: 'Come usare questo volume', sorgenti: ['00_intro.md'] },
  ...Array.from({ length: N_PARTI }, (_, i) => {
    const n = i + 1;
    return {
      slug: slugifica(NOMI_PARTE_BREVI[n] ?? `parte-${n}`),
      ordine: n,
      titolo: (NOMI_PARTE[n] ?? `Parte ${n}`).replace(' · ', '. '),
      sorgenti: [`0${n}_parte${n}.md`],
    };
  }),
];

/** Rimuove il frontmatter YAML se presente. */
function senzaFrontmatter(testo: string): string {
  if (!testo.startsWith('---')) return testo;
  const fine = testo.indexOf('\n---', 3);
  return fine === -1 ? testo : testo.slice(fine + 4);
}

/** Sostituisce l'ambiente landscape/TikZ (la mappa) con il rimando al grafo. */
function sostituisciMappa(testo: string): string {
  return testo.replace(
    /\\begin\{landscape\}[\s\S]*?\\end\{landscape\}/g,
    `<div class="nota"><p class="nota-titolo">La mappa rivista</p>

Nel volume a stampa questa pagina ospita la mappa concettuale delle sei parti. In questo
atlante la mappa non è un'illustrazione ma l'interfaccia: la trovi, viva e filtrabile,
nella [vista a grafo](/grafo) e nell'[elenco delle voci](/grafo/elenco).

</div>`
  );
}

/** \begin{nota}[title=X] ... \end{nota} → callout HTML. */
function convertiNote(testo: string): string {
  return testo.replace(
    /\\begin\{nota\}(?:\[title=([^\]]*)\])?\s*([\s\S]*?)\\end\{nota\}/g,
    (_tutto, titolo: string | undefined, corpo: string) =>
      `<div class="nota">${titolo ? `<p class="nota-titolo">${pulisciInline(titolo)}</p>` : ''}\n\n${pulisciInline(corpo).trim()}\n\n</div>`
  );
}

/** Pulizia dei comandi inline residui. */
function pulisciInline(testo: string): string {
  return testo
    .replace(/\\emph\{([^}]*)\}/g, '*$1*')
    .replace(/\\mbox\{([^}]*)\}/g, '$1')
    .replace(/\$\\cdot\$/g, '·')
    .replace(/\$\\rightarrow\$/g, '→')
    .replace(/\\rightarrow/g, '→')
    .replace(/\$E=mc\^2\$/g, 'E = mc²')
    .replace(/\\newpage/g, '')
    .replace(/\\thispagestyle\{[^}]*\}/g, '')
    .replace(/\\phantomsection/g, '')
    .replace(/\\addcontentsline\{[^}]*\}\{[^}]*\}\{[^}]*\}/g, '');
}

/** Le definition list in stile Pandoc del glossario → <dl>. */
function convertiDefinizioni(testo: string): string {
  const righe = testo.split('\n');
  const uscita: string[] = [];
  let inDl = false;
  for (let i = 0; i < righe.length; i++) {
    const riga = righe[i]!;
    const prossima = righe[i + 1] ?? '';
    const eTermine = riga.trim().length > 0 && !riga.startsWith(':') && !riga.startsWith('#') && /^:\s{2,}/.test(prossima);
    if (eTermine) {
      if (!inDl) {
        uscita.push('<dl>');
        inDl = true;
      }
      uscita.push(`<dt>${riga.trim()}</dt>`);
      // raccogli le righe della definizione (": ..." più eventuali continuazioni)
      let j = i + 1;
      const definizione: string[] = [];
      while (j < righe.length && (/^:\s{2,}/.test(righe[j]!) || (definizione.length > 0 && /^\s{4,}\S/.test(righe[j]!)))) {
        definizione.push(righe[j]!.replace(/^:\s{2,}/, '').trim());
        j++;
      }
      uscita.push(`<dd>${definizione.join(' ')}</dd>`);
      i = j - 1;
    } else {
      if (inDl && riga.startsWith('#')) {
        uscita.push('</dl>');
        inDl = false;
      }
      uscita.push(riga);
    }
  }
  if (inDl) uscita.push('</dl>');
  return uscita.join('\n');
}

/** Toglie i marcatori {-} dai titoli e degrada gli h1 interni (il titolo lo dà la pagina). */
function sistemaTitoli(testo: string): string {
  return testo
    .replace(/^(#{1,6})\s*(.+?)\s*\{-\}\s*$/gm, '$1 $2')
    .replace(/^# .+$\n?/gm, ''); // gli h1 dei file diventano il titolo del capitolo
}

/** Estrae la sezione fra due h1 (inclusa l'intestazione di partenza esclusa). */
function ritaglia(testo: string, daH1?: string, aH1?: string): string {
  let risultato = testo;
  if (daH1) {
    const indice = risultato.indexOf(`# ${daH1}`);
    if (indice >= 0) risultato = risultato.slice(indice);
  }
  if (aH1) {
    const indice = risultato.indexOf(`# ${aH1}`);
    if (indice >= 0) risultato = risultato.slice(0, indice);
  }
  return risultato;
}

export function generaCapitoli(): number {
  mkdirSync(DIR_USCITA, { recursive: true });
  const avvisi: string[] = [];
  for (const capitolo of CAPITOLI) {
    let corpo = capitolo.sorgenti
      .map((f) => senzaFrontmatter(readFileSync(join(DIR_SORGENTE, f), 'utf-8')))
      .join('\n\n');
    corpo = ritaglia(corpo, capitolo.daH1, capitolo.aH1);
    corpo = sostituisciMappa(corpo);
    corpo = convertiNote(corpo);
    corpo = pulisciInline(corpo);
    if (capitolo.slug === 'glossario') corpo = convertiDefinizioni(corpo);
    corpo = sistemaTitoli(corpo).trim();

    // controllo: nessun residuo LaTeX evidente
    const residui = corpo.match(/\\(begin|end|[a-zA-Z]+\{)/g);
    if (residui) avvisi.push(`${capitolo.slug}: residui LaTeX ${[...new Set(residui)].join(', ')}`);

    const fm = [
      '---',
      `ordine: ${capitolo.ordine}`,
      `titolo: "${capitolo.titolo.replace(/"/g, '\\"')}"`,
      ...(capitolo.sottotitolo ? [`sottotitolo: "${capitolo.sottotitolo}"`] : []),
      '---',
    ].join('\n');
    writeFileSync(join(DIR_USCITA, `${capitolo.slug}.md`), `${fm}\n\n${corpo}\n`);
  }
  if (avvisi.length > 0) {
    for (const avviso of avvisi) console.warn(`⚠ ${avviso}`);
  }
  return CAPITOLI.length;
}

const eseguitoDirettamente = process.argv[1] && resolve(process.argv[1]).includes('build-capitoli');
if (eseguitoDirettamente) {
  const n = generaCapitoli();
  console.log(`✓ capitoli: ${n} file generati in src/generated/capitoli`);
}
