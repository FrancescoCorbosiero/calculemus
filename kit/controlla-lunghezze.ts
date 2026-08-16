/**
 * Script usa-e-getta di costruzione: controlla che ogni corpo di voce rispetti
 * le lunghezze di regole.lunghezze del seme (parole per peso) e segnala i
 * corpi ancora provvisori e i marcatori `verificare` residui.
 *
 * Uso: npx tsx kit/controlla-lunghezze.ts [--solo-definitivi]
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const seme = JSON.parse(readFileSync(join(RADICE, 'kit/seme.json'), 'utf8'));
const lunghezze: Record<string, [number, number]> = seme.regole.lunghezze;
const soloDefinitivi = process.argv.includes('--solo-definitivi');

const dir = join(RADICE, 'src/content/voci');
let provvisori = 0;
let fuoriMisura = 0;
let daVerificare = 0;

for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
  const { data, content } = matter(readFileSync(join(dir, file), 'utf8'));
  const provvisorio = content.includes('<!-- provvisorio -->');
  if (provvisorio) {
    provvisori++;
    if (!soloDefinitivi) console.log(`⏳ provvisorio: ${file}`);
    continue;
  }
  const marcatori = [...content.matchAll(/<!--\s*verificare:([^>]*)-->/g)];
  daVerificare += marcatori.length;
  const testo = content
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`«»]/g, ' ');
  const parole = testo.split(/\s+/).filter(Boolean).length;
  if (data.tipo === 'parte') continue; // le voci parte non hanno vincolo di lunghezza
  const [min, max] = lunghezze[String(data.peso)] ?? [0, Infinity];
  if (parole < min || parole > max) {
    fuoriMisura++;
    console.log(`✗ ${file}: ${parole} parole (peso ${data.peso}: ${min}–${max})`);
  }
}

console.log(
  `\n${provvisori} corpi provvisori · ${fuoriMisura} fuori misura · ${daVerificare} marcatori «verificare» residui`
);
if (fuoriMisura > 0) process.exit(1);
