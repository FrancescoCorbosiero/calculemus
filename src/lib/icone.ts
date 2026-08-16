import type { TipoNodo } from './costanti';

/**
 * Glifi per tipo di nodo: path SVG minimi (viewBox 0 0 24 24, stroke o fill
 * monocromo) usati in legenda, elenco, pannello e — come data-URI — dentro i
 * nodi Sigma. Il tipo è sempre comunicato anche a testo: il glifo è un
 * rinforzo, non l'unico canale.
 *
 * La mappa è per id di tipo: i glifi qui sotto appartengono all'istanza di
 * riferimento (più "parte", strutturale). Un tipo del seme senza glifo
 * dedicato usa il glifo generico: aggiungerne di propri è una
 * personalizzazione facoltativa, non un prerequisito del motore.
 */
export const GLIFI_TIPO: Record<string, string> = {
  // rombo: le macro-aree (le parti del volume)
  parte: 'M12 3 L21 12 L12 21 L3 12 Z',
  // ventaglio di raggi: un'area di ricerca che si apre
  area: 'M12 20 L5 6 M12 20 L12 4 M12 20 L19 6',
  // cerchio con punto: un concetto
  concetto: 'M12 4 A8 8 0 1 0 12.01 4 Z M12 10.5 A1.5 1.5 0 1 0 12.01 10.5 Z',
  // gradini discendenti: i passi di una procedura
  algoritmo: 'M4 6 L10 6 L10 12 L16 12 L16 18 L22 18',
  // parentesi angolari: un linguaggio
  linguaggio: 'M9 6 L3 12 L9 18 M15 6 L21 12 L15 18',
  // chip con i piedini: un sistema
  sistema: 'M7 7 H17 V17 H7 Z M12 3 V7 M12 17 V21 M3 12 H7 M17 12 H21',
  // busto: una persona
  persona: 'M12 4 A4 4 0 1 0 12.01 4 Z M4 20 Q4 13 12 13 Q20 13 20 20 Z',
  // libro aperto: un'opera
  opera: 'M4 5 Q8 3.5 12 5.5 L12 19.5 Q8 17.5 4 19 Z M20 5 Q16 3.5 12 5.5 L12 19.5 Q16 17.5 20 19 Z',
  // clessidra: un evento datato
  evento: 'M6 3 L18 3 L18 7 L13 12 L18 17 L18 21 L6 21 L6 17 L11 12 L6 7 Z',
  // goccia rovesciata / segnaposto: un luogo
  luogo: 'M12 21 Q5 13.5 5 9.5 A7 7 0 0 1 19 9.5 Q19 13.5 12 21 Z M12 7 A2.5 2.5 0 1 0 12.01 7 Z',
};

/** Glifo generico (cerchio con punto) per i tipi senza glifo dedicato. */
export const GLIFO_GENERICO = 'M12 4 A8 8 0 1 0 12.01 4 Z M12 10.5 A1.5 1.5 0 1 0 12.01 10.5 Z';

/** Glifi resi a tratto (stroke) invece che a riempimento. */
const GLIFI_A_TRATTO = new Set(['area', 'algoritmo', 'linguaggio', 'sistema']);

/** Il path del glifo per il tipo, con ripiego sul glifo generico. */
export function glifoTipo(tipo: TipoNodo | string): string {
  return GLIFI_TIPO[tipo] ?? GLIFO_GENERICO;
}

/** true se il glifo del tipo va reso a tratto (stroke) e non a riempimento. */
export function glifoATratto(tipo: TipoNodo | string): boolean {
  return GLIFI_A_TRATTO.has(tipo);
}

/** SVG completo come stringa, per i data-URI dei nodi Sigma. */
export function svgGlifo(tipo: TipoNodo, colore = '#ffffff'): string {
  const path = glifoTipo(tipo);
  const attributi = glifoATratto(tipo)
    ? `fill="none" stroke="${colore}" stroke-width="2.4" stroke-linecap="round"`
    : `fill="${colore}" fill-rule="evenodd"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}" ${attributi}/></svg>`;
}

export function dataUriGlifo(tipo: TipoNodo, colore = '#ffffff'): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgGlifo(tipo, colore))}`;
}
