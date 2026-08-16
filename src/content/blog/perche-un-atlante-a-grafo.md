---
titolo: "Perché un atlante a grafo dell'informatica"
sommario: "L'informatica si studia per cronologie o per manuali; ma il campo è fatto di relazioni — filiazioni, opposizioni, implementazioni. Perché la mappa delle relazioni è la porta principale di questo atlante."
data: 2026-08-12
tag: [metodo, progetto]
---

L'informatica si racconta di solito in due modi. Il primo è la cronologia: prima Babbage, poi Turing, poi l'ENIAC, poi Internet — una processione di date che suggerisce un progresso lineare e inevitabile. Il secondo è il manuale: le strutture dati, i linguaggi, le reti, ciascuno nel suo capitolo, come se fossero nati già ordinati per argomento. Entrambi i racconti funzionano, ed entrambi mentono un po': il campo non è cresciuto né in fila né per capitoli. È cresciuto **per relazioni**.

## Il campo è un grafo

Che cosa lega la tesi di laurea di [Shannon](/voce/shannon) all'algebra di [Boole](/voce/boole), scritta ottant'anni prima e senza alcuna applicazione in vista? Che cosa lega il [lambda-calcolo](/voce/lambda-calcolo) di Church — logica pura degli anni Trenta — a [Lisp](/voce/lisp), e Lisp alla programmazione funzionale di oggi? Perché per capire [Internet](/voce/internet) bisogna passare da un articolo del 1945 su una scrivania immaginaria ([As We May Think](/voce/as-we-may-think))?

Sono domande sulle **frecce**, non sui nodi. La storia dell'informatica è fatta di influenze a distanza di decenni, di derivazioni dichiarate, di opposizioni esplicite (la [programmazione strutturata](/voce/programmazione-strutturata) nasce *contro* qualcosa), di implementazioni che trasformano un'idea di carta in una macchina. Un racconto lineare deve tagliare quasi tutte queste frecce; un manuale le nasconde dentro i confini dei capitoli. Un grafo le mostra.

Per questo in Calculemus la vista principale è [il grafo](/grafo): 170 voci — persone, concetti, macchine, linguaggi, opere, eventi, luoghi — e le relazioni tipizzate che le collegano. Ogni arco ha un tipo (*influenza*, *deriva da*, *si oppone a*, *implementa*, *formalizza*…) e, dove serve, una nota che dice perché la freccia esiste. Il grafo non è un'illustrazione del contenuto: **è** il contenuto, derivato a ogni build dal frontmatter delle voci, con la pipeline che si rifiuta di compilare se una freccia punta nel vuoto.

## Senza rinunciare al filo

Un grafo da solo, però, non si studia: si vaga. Per questo l'atlante tiene entrambe le forme. C'è [il volume](/leggi), sei parti in prosa continua da leggere nell'ordine, per chi vuole il filo; ci sono i [percorsi d'autore](/percorsi), otto tappe narrate alla volta, per chi vuole un filo più corto; c'è la [timeline](/tempo) per il colpo d'occhio cronologico — l'antidoto all'idea che «i computer» siano nati tutti insieme. E ogni vista grafica ha il suo equivalente testuale, perché un atlante che si legge solo col mouse è un atlante che esclude.

La scommessa è che le due modalità si rinforzino: prima il filo, poi la rete. Si legge il capitolo sui fondamenti, e poi si apre il grafo per scoprire che la [macchina di Turing](/voce/macchina-di-turing) ha frecce che arrivano fino all'[architettura di von Neumann](/voce/architettura-di-von-neumann) e oltre. L'ordine di lettura è un servizio; la struttura reale del campo è la rete. Questo atlante prova a non sacrificare nessuna delle due.
