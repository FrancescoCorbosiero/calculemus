# Guida di stile per le voci di Calculemus

Vincolante per chiunque scriva o amplii un corpo di voce. Deriva dal registro
del motore Correspondentia e dalle `regole` del seme (`kit/seme.json`).

## Che cosa toccare e che cosa no

- Si modifica **solo il corpo** della voce: tutto ciò che sta **dopo** la seconda riga `---`
  del file in `src/content/voci/<id>.md`.
- **Mai** toccare il frontmatter (id, titolo, tipo, parte, sommario, periodo, luoghi,
  alias, peso, archi, fonti): è la fonte del grafo, validata dalla build.
- Il segnaposto `<!-- provvisorio -->` va **rimosso** e sostituito dal testo completo.
- Il corpo non ripete il sommario alla lettera: lo sviluppa.

## Lunghezze (per campo `peso` del frontmatter, da `regole.lunghezze` del seme)

| peso | parole |
|---|---|
| 5 | 400–1500 |
| 4 | 250–600 |
| 3 | 200–400 |
| 2 | 150–300 |
| 1 | 120–250 |

## Registro

Divulgativo-accademico: rigoroso, non apologetico, non derisorio. Frasi piene,
andamento saggistico, nessun tono celebrativo da rivista di settore, nessun
sensazionalismo, nessuna seconda persona. Si può essere eleganti e persino
ironici dove il materiale lo consente (l'ironia è asciutta), mai sarcastici.
Niente futurologia: l'atlante è storico-concettuale, non un osservatorio di
tendenze.

In pratica:

- corsivo per termini tecnici alla prima occorrenza e per i titoli d'opera
  (*On Computable Numbers*, *time-sharing*);
- virgolette basse «» per citazioni brevi e usi segnalati;
- grassetto sobrio per gli snodi concettuali, non per enfasi decorativa;
- sezioni `##` solo per voci di peso ≥ 3; mai `#` (il titolo lo mette la pagina);
- niente elenchi puntati come scorciatoia: si usano quando l'elenco è la forma giusta;
- niente frammenti di codice: i concetti si spiegano in prosa (l'atlante non è un manuale).

## Regole vincolanti (i guardrail del seme)

1. **Le priorità contese restano contese.** ENIAC/ABC/Z3, paternità di idee e
   macchine: si presentano le posizioni e i criteri impliciti («primo» secondo
   quale definizione?), mai risolte d'ufficio in un solo «inventore».
2. **Vulgate e miti fondativi si raccontano e si marcano come tali** (il garage,
   il genio solitario, il «primo bug»), con ciò che la storiografia documenta
   accanto al racconto corrente.
3. **Le figure cancellate dal racconto corrente sono restituite alla storia**:
   le programmatrici dell'ENIAC, Tommy Flowers, i contributi collettivi dietro
   gli eponimi individuali.
4. **Crittografia e sicurezza si descrivono storicamente e concettualmente**:
   struttura, logica, storia sì; nessuna istruzione operativa per attacchi,
   esfiltrazioni o abusi.
5. **Il risultato matematico è distinto dalla sua vulgata**: le affermazioni di
   impossibilità citano il teorema e il suo enunciato reale (l'incompletezza di
   Gödel non dice che «la matematica è soggettiva»; la fermata non dice che «i
   programmi non si possono verificare»).
6. **Ogni voce cita in calce letteratura reale** (storiografia dell'informatica
   o testi tecnici canonici); nessuna fonte inventata. Il campo `fonti` del
   frontmatter non si tocca e non si duplica nel corpo; nel corpo le tesi
   controverse si attribuiscono per nome («secondo Haigh», «la tesi di
   Ceruzzi»), senza apparato di note.

## Accuratezza

- La base fattuale sono il sommario e gli archi del seme più il sapere
  consolidato e non controverso, nei limiti delle fonti citate in calce.
- **Vietato inventare**: date precise, titoli, aneddoti, citazioni testuali e
  riferimenti bibliografici che non si è in grado di garantire. Nel dubbio:
  formulazione generica («all'inizio degli anni Cinquanta», «gli storici») o
  omissione.

## Struttura consigliata per tipo

- **area**: perimetro e domanda fondativa → nascita e sviluppo → risultati che
  la definiscono → eredità nelle aree vicine.
- **concetto**: definizione precisa → logica interna → storia della sua
  formazione → dove lavora oggi nel campo.
- **algoritmo**: il problema che risolve → l'idea in prosa (mai pseudocodice
  operativo per usi offensivi) → storia e paternità (con le contese) → costo e
  limiti.
- **linguaggio**: contesto e scopo di nascita → idee caratterizzanti → fortuna
  e discendenza. Non manuali: profili storico-concettuali.
- **sistema**: che cosa era/è e per chi → architettura concettuale → storia →
  eredità. Le macchine si datano e si contestualizzano, non si celebrano.
- **persona**: chi era e perché conta → l'opera/le idee → ricezione ed eredità,
  vulgata inclusa dove esiste. Non biografie complete: profili funzionali
  all'atlante.
- **opera**: che cos'è → contenuto → contesto di pubblicazione → fortuna (e
  fraintendimenti).
- **evento**: che cosa accadde → perché è uno snodo del campo.
- **luogo**: che cosa vi accadde e perché lì; il luogo come contesto, non
  cartolina (né agiografia istituzionale).

## Collegamenti interni

- Collegare le altre voci quando compaiono nel testo: `[Turing](/voce/turing)`.
- Solo id esistenti (l'inventario completo è nel seme, `kit/seme.json`); la
  build fallisce sui collegamenti pendenti.
- Collegare la prima occorrenza rilevante, non ogni occorrenza; 3–8 link per
  voce sono una buona misura.
- Non linkare la voce a se stessa; non usare URL assoluti né il prefisso del sito.

## Esempio di attacco (registro)

> Il «primo bug» è conservato sotto nastro adesivo in un quaderno di laboratorio:
> una falena, trovata in un relè del Mark II nel 1947, con la didascalia «first
> actual case of bug being found». L'aneddoto è vero; l'etimologia che la vulgata
> ne ricava è falsa. «Bug» per «difetto tecnico» circolava già ai tempi di
> Edison, e chi scrisse quella didascalia lo sapeva benissimo: la battuta sta
> proprio lì.

Così: fatti precisi, giudizio storiografico esplicito, nessuna strizzata
d'occhio alla leggenda.
