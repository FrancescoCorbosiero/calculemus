/**
 * Script usa-e-getta di costruzione (Calculemus): genera da kit/seme.json
 * le voci di src/content/voci (frontmatter completo + corpo provvisorio
 * marcato `<!-- provvisorio -->`) e i percorsi di src/content/percorsi.
 * Le voci `parte-N` vengono dalle `parti` del seme; le loro fonti sono le
 * più citate dalle voci della parte.
 *
 * Uso: npx tsx kit/genera-contenuto.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const seme = JSON.parse(readFileSync(join(RADICE, 'kit/seme.json'), 'utf8'));

const DIR_VOCI = join(RADICE, 'src/content/voci');
const DIR_PERCORSI = join(RADICE, 'src/content/percorsi');
mkdirSync(DIR_VOCI, { recursive: true });
mkdirSync(DIR_PERCORSI, { recursive: true });

const q = (s: string): string => JSON.stringify(s); // scalare YAML sicuro

interface Arco {
  verso: string;
  tipo: string;
  nota?: string;
}

function rigaArco(a: Arco): string {
  const campi = [`verso: ${a.verso}`, `tipo: ${a.tipo}`];
  if (a.nota) campi.push(`nota: ${q(a.nota)}`);
  return `  - { ${campi.join(', ')} }`;
}

interface Voce {
  id: string;
  titolo: string;
  tipo: string;
  parte: number;
  peso: number;
  sommario: string;
  periodo?: { da: number; a: number };
  luoghi?: string[];
  alias?: string[];
  archi?: Arco[];
  fonti?: string[];
}

function fileVoce(v: Voce, corpo: string): string {
  const righe = [
    '---',
    `id: ${v.id}`,
    `titolo: ${q(v.titolo)}`,
    `tipo: ${v.tipo}`,
    `parte: ${v.parte}`,
    `sommario: ${q(v.sommario)}`,
  ];
  if (v.periodo) righe.push(`periodo: { da: ${v.periodo.da}, a: ${v.periodo.a} }`);
  if (v.luoghi?.length) righe.push(`luoghi: [${v.luoghi.join(', ')}]`);
  if (v.alias?.length) righe.push(`alias: [${v.alias.map(q).join(', ')}]`);
  righe.push(`peso: ${v.peso}`);
  if (v.archi?.length) {
    righe.push('archi:');
    for (const a of v.archi) righe.push(rigaArco(a));
  }
  if (v.fonti?.length) {
    righe.push('fonti:');
    for (const f of v.fonti) righe.push(`  - ${q(f)}`);
  }
  righe.push('---', '', corpo, '');
  return righe.join('\n');
}

/* ── voci dal seme ────────────────────────────────────────────────────── */

let n = 0;
for (const v of seme.voci as Voce[]) {
  const corpo = `<!-- provvisorio -->\n${v.sommario}`;
  writeFileSync(join(DIR_VOCI, `${v.id}.md`), fileVoce(v, corpo));
  n++;
}

/* ── voci parte-N dalle `parti` (id/titolo/sommario ESATTI del seme:
      l'estrazione di kit/estrai-seme.ts li confronta alla lettera) ─────── */

// fonti della parte voce: le due più citate dalle voci della parte
const contaFonti = new Map<number, Map<string, number>>();
for (const v of seme.voci as Voce[]) {
  const mappa = contaFonti.get(v.parte) ?? new Map<string, number>();
  for (const f of v.fonti ?? []) mappa.set(f, (mappa.get(f) ?? 0) + 1);
  contaFonti.set(v.parte, mappa);
}

for (const p of seme.parti as { numero: number; id: string; titolo: string; sommario: string }[]) {
  const fonti = [...(contaFonti.get(p.numero) ?? new Map()).entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'it'))
    .slice(0, 2)
    .map(([f]) => f);
  const voce: Voce = {
    id: p.id,
    titolo: p.titolo,
    tipo: 'parte',
    parte: p.numero,
    peso: 5,
    sommario: p.sommario,
    fonti,
  };
  const corpo = `<!-- provvisorio -->\n${p.sommario}`;
  writeFileSync(join(DIR_VOCI, `${p.id}.md`), fileVoce(voce, corpo));
  n++;
}

/* ── percorsi: le `tracce` diventano i `testo` delle tappe ────────────── */

interface Percorso {
  slug: string;
  titolo: string;
  sottotitolo: string;
  ordine: number;
  tappe: { voce: string; traccia: string }[];
}

let np = 0;
for (const p of seme.percorsi as Percorso[]) {
  const righe = [
    '---',
    `slug: ${p.slug}`,
    `titolo: ${q(p.titolo)}`,
    `sottotitolo: ${q(p.sottotitolo)}`,
    `ordine: ${p.ordine}`,
    'tappe:',
  ];
  for (const t of p.tappe) {
    righe.push(`  - voce: ${t.voce}`);
    righe.push(`    testo: ${q(t.traccia)}`);
  }
  righe.push('---', '', `<!-- provvisorio -->\n${p.sottotitolo}.`, '');
  writeFileSync(join(DIR_PERCORSI, `${p.slug}.md`), righe.join('\n'));
  np++;
}

console.log(`✓ generati ${n} file voce (incluse le parti) e ${np} percorsi`);
