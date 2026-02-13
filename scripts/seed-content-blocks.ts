import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

const contentBlocksBySlug: Record<string, { text: string }[]> = {
  'pavimenti-cemento-elicotterato': [
    {
      text: "Il cemento armato lavorato con indurente al quarzo, è composto principalmente da cemento, acqua ed inerti miscelati tra di loro in dosi corrette, il risultato è molto resistente con un ottimo livello di permeabilità.",
    },
    {
      text: "Ha diversi utilizzi nel settore dell'edilizia per le sue caratteristiche di resistenza e durezza.",
    },
    {
      text: "Consigliamo questa tipologia di pavimentazione per infrastrutture, grandi opere, aree industriali, magazzini, piazzali, parcheggi e altre tipi di superfici che necessitano di basi d'appoggio sicure e forti.",
    },
    {
      text: "Ci operiamo per garantire al cliente il miglior risultato funzionale con finiture superficiali di alta qualità meccanica con possibilità di scelta di differenti colorazioni sia per la lavorazione a spolvero che a pastina.",
    },
  ],
  'pavimenti-cemento-stampato': [
    {
      text: "Grazie a questa tipologia di pavimento si ottiene una superficie che mantiene la stessa praticità del calcestruzzo ma trasformata in un'opera di particolare bellezza che propone l'estetica della roccia, della ceramica, della pietra naturale, dei mattoni e anche del legno.",
    },
    {
      text: "Si ottiene una superficie monolitica, quindi non a rischio avvallamenti e assestamenti, che richiede pochissima manutenzione nel corso degli anni.",
    },
    {
      text: "Ogni pavimentazione è un'opera unica e originale, si possono utilizzare differenti colorazioni e decorazioni allo scopo di ottenere un risultato che soddisfi a pieno le esigenze, i gusti e la personalità del cliente.",
    },
  ],
  'pavimenti-cemento-acidificato': [
    {
      text: "Il lavoro finito trasforma il calcestruzzo in una bellezza ricca e naturale. Effetto scenico, aspetto moderno, praticità di pulizia e manutenzione sono le caratteristiche principali di questa pavimentazione.",
    },
    {
      text: "Ideale per chi vuole realizzare una superficie di tendenza, molto bella e resistente; perfetto per show room, centri commerciali e anche abitazioni private.",
    },
    {
      text: "Viene realizzato mediante l'utilizzo di particolari acidi a base di sali metallici che penetrano nel calcestruzzo e ne cambiano chimicamente la tonalità per produrre effetti di colore unici, permanenti, variegati e traslucidi.",
    },
  ],
  'pavimenti-cemento-levigato-lucidato': [
    {
      text: "Processo di nobilitazione del pavimento nuovo o esistente, molto utilizzato in America, la superficie viene trattata e lavorata con appositi macchinari per la levigazione e con particolari silicati di litio che aumentano la durezza e la densità del cemento fino al 500%.",
    },
    {
      text: "Il risultato sarà un pavimento con una resistenza all'abrasione elevatissima, traspirabile e con una superficie lucida come il vetro di facile pulizia con macchine lava asciuga.",
    },
    {
      text: "Ideale per autosaloni, depositi, officine ma anche per il settore alimentare, della ristorazione e elettronica.",
    },
  ],
  'pavimenti-cemento-sasso-lavato': [
    {
      text: "Particolare pavimentazione ottenuta mescolando al cemento: sassi di fiume o pietra naturale, graniglia di marmi e una miscela fibrorinforzata colorata e additivata.",
    },
    {
      text: "Consigliamo questa soluzione per piazze, marciapiedi, aree pedonali, piscine, terrazze e viali in parchi e giardini. Le principali caratteristiche sono: praticità, sicurezza, resistenza e antisdrucciolo.",
    },
    {
      text: "Abbiamo la possibilità di realizzare diverse configurazioni con tipologie e colorazioni a scelta del cliente. È la migliore alternativa alla ghiaia per manutenzione e costi ridotti, elimina il problema delle erbe infestanti e la necessità di ricomporre i ciottoli che presentano problematiche col tempo.",
    },
  ],
  'rampe-cemento': [
    {
      text: "Per le caratteristiche di robustezza e resistenza nel tempo, le rampe di accesso veicolare si realizzano comunemente in calcestruzzo.",
    },
    {
      text: "Due tipi di finiture: pettinata e a spina di pesce. Quest'ultima si realizza incidendo a fresco lo strato di quarzo-cemento con degli stampi appositi, la superficie che si ottiene favorisce l'aderenza degli pneumatici anche in condizioni difficili.",
    },
    {
      text: "La tipologia pettinata è maggiormente consigliata per passaggi pedonali e carrozzine.",
    },
    {
      text: "Le rampe in calcestruzzo sono utilizzate in abitazioni private, centri commerciali, garage, autosilo e industrie.",
    },
  ],
  'pavimenti-resina': [
    {
      text: "Pavimenti specifici per richieste di alti standard, hanno svariate caratteristiche: resistenza chimica e all'usura, durevolezza ed elasticità.",
    },
    {
      text: "Il risultato sono superfici continue ed igieniche in conformità con le norme vigenti in ogni specifico settore. I trattamenti in resina sono adatti per superfici nuove o ammalorate da recuperare.",
    },
    {
      text: "Utilizziamo le migliori soluzioni tecnologiche, personalizzabili ed ecosostenibili con materiali privi di inquinanti e solventi.",
    },
  ],
}

async function run() {
  for (const [slug, blocks] of Object.entries(contentBlocksBySlug)) {
    const service = await client.fetch<{ _id: string } | null>(
      `*[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ _id }`,
      { slug }
    )

    if (!service) {
      console.log(`⚠ Servizio non trovato: ${slug}`)
      continue
    }

    const contentBlocks = blocks.map((b) => ({
      _type: 'object',
      _key: Math.random().toString(36).slice(2, 10),
      text: b.text,
    }))

    await client.patch(service._id).set({ contentBlocks }).commit()
    console.log(`✓ ${slug}: ${blocks.length} blocchi`)
  }
}

run().catch(console.error)
