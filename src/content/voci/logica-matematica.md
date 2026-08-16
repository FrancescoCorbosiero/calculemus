---
id: logica-matematica
titolo: "Logica matematica"
tipo: area
parte: 1
sommario: "Il terreno da cui l’informatica è nata: la formalizzazione del ragionamento da Frege a Hilbert, i suoi trionfi e i suoi limiti scoperti da Gödel."
periodo: { da: 1879, a: 1940 }
peso: 4
archi:
  - { verso: teoria-della-computabilita, tipo: influenza, nota: "La computabilità nasce come capitolo della logica" }
  - { verso: lambda-calcolo, tipo: influenza }
fonti:
  - "Davis, The Universal Computer"
---

«Calculemus»: quando due persone dissentono, sognava [Gottfried Wilhelm Leibniz](/voce/leibniz) sul finire del Seicento, un giorno basterà sedersi e dire: calcoliamo. Il ragionamento come calcolo, la disputa come conto da verificare. Per due secoli il sogno restò ottimismo filosofico; poi la logica matematica lo prese alla lettera e, nel tentativo di realizzarlo — riuscendo e fallendo insieme —, preparò senza saperlo il terreno all'informatica.

## Dal linguaggio al sistema formale

L'atto di nascita porta la data del 1879: la *Begriffsschrift* di Gottlob Frege, un'«ideografia» in cui ogni passo deduttivo è manipolazione di segni secondo regole esplicite, verificabile senza appello all'intuizione. Per la prima volta quantificatori e variabili hanno una sintassi; la logica smette di essere arte del discorso e diventa sistema. L'edificio di Frege crollò sotto il paradosso che Bertrand Russell gli comunicò nel 1902, ma il metodo sopravvisse al naufragio: i *Principia Mathematica* di Whitehead e Russell mostrarono, a prezzo di una fatica leggendaria, che la matematica ordinaria si lascia ricostruire dentro un sistema formale.

Su questa base [David Hilbert](/voce/hilbert) costruì un programma: formalizzare l'intera matematica; dimostrarne la coerenza con metodi elementari e incontestabili; trovare una procedura meccanica — l'*Entscheidungsproblem*, messo a fuoco nel 1928 — per decidere di ogni formula se sia dimostrabile. Se il programma fosse riuscito, il sogno di Leibniz sarebbe diventato un teorema.

## I limiti scoperti dall'interno

Nel 1931 [Kurt Gödel](/voce/godel) stabilì che, così com'era posto, il programma non può riuscire. I teoremi di incompletezza dicono — nell'enunciato reale, che la vulgata maltratta volentieri — che ogni sistema formale coerente, effettivamente assiomatizzabile e capace di esprimere l'aritmetica contiene enunciati che non può né dimostrare né refutare, e non può dimostrare la propria coerenza. Non dicono che la matematica sia incerta o soggettiva: dicono che nessun singolo sistema formale la esaurisce.

Restava l'Entscheidungsproblem, e per chiuderlo bisognava definire con precisione che cosa sia una «procedura meccanica». Nel 1936 [Alonzo Church](/voce/church), con il [lambda-calcolo](/voce/lambda-calcolo), e [Alan Turing](/voce/turing), con le sue macchine di carta, arrivarono indipendentemente alla stessa risposta: la procedura universale di decisione non esiste. Per dimostrare un'impossibilità, la logica aveva dovuto produrre la prima definizione matematica di calcolo.

## L'eredità

È il paradosso fecondo su cui insiste la ricostruzione di Martin Davis: la strada che porta da Leibniz a Turing è lastricata di fallimenti gloriosi, e al suo termine non c'è la macchina che risolve le dispute ma la teoria di tutte le macchine possibili. La [teoria della computabilità](/voce/teoria-della-computabilita) nacque così, come un capitolo della logica, con teoremi di logici e per problemi di logici; l'informatica ne avrebbe fatto il proprio fondamento, ereditando dalla disciplina madre gli strumenti, il lessico e — nel bene e nel male — l'idea che il rigore sia questione di sintassi.
