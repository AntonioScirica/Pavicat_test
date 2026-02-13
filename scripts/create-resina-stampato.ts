import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  // Resina
  const resina = await client.create({
    _type: 'service',
    title: 'Pavimenti in resina',
    slug: { _type: 'slug', current: 'pavimenti-resina' },
    pillLabel: 'Resina',
    category: 'Resina',
    shortDescription: "Pavimenti specifici per alti standard: resistenza chimica e all'usura, durevolezza ed elasticità. Superfici continue ed igieniche.",
    order: 3,
    contentBlocks: [
      {
        _type: 'object',
        _key: 'cb1',
        text: "Pavimenti specifici per richieste di alti standard, hanno svariate caratteristiche: resistenza chimica e all'usura, durevolezza ed elasticità.",
      },
      {
        _type: 'object',
        _key: 'cb2',
        text: "Il risultato sono superfici continue ed igieniche in conformità con le norme vigenti in ogni specifico settore. I trattamenti in resina sono adatti per superfici nuove o ammalorate da recuperare.",
      },
      {
        _type: 'object',
        _key: 'cb3',
        text: "Utilizziamo le migliori soluzioni tecnologiche, personalizzabili ed ecosostenibili con materiali privi di inquinanti e solventi.",
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Resina | Pavicat',
      metaDescription: "Pavimenti in resina ad alte prestazioni: resistenza chimica, durevolezza, superfici igieniche. Soluzioni ecosostenibili. Pavicat, dal 1980 a Torino.",
    },
  })
  console.log(`✓ ${resina.title} (${resina._id}) - 3 card con testo`)

  // Stampato
  const stampato = await client.create({
    _type: 'service',
    title: 'Pavimenti in cemento stampato',
    slug: { _type: 'slug', current: 'pavimenti-cemento-stampato' },
    pillLabel: 'Cemento stampato',
    category: 'Cemento stampato',
    shortDescription: "Superficie con la praticità del calcestruzzo e l'estetica della roccia, ceramica, pietra naturale, mattoni e legno.",
    order: 4,
    contentBlocks: [
      {
        _type: 'object',
        _key: 'cb1',
        text: "Grazie a questa tipologia di pavimento si ottiene una superficie che mantiene la stessa praticità del calcestruzzo ma trasformata in un'opera di particolare bellezza che propone l'estetica della roccia, della ceramica, della pietra naturale, dei mattoni e anche del legno.",
      },
      {
        _type: 'object',
        _key: 'cb2',
        text: "Si ottiene una superficie monolitica, quindi non a rischio avvallamenti e assestamenti, che richiede pochissima manutenzione nel corso degli anni.",
      },
      {
        _type: 'object',
        _key: 'cb3',
        text: "Ogni pavimentazione è un'opera unica e originale, si possono utilizzare differenti colorazioni e decorazioni allo scopo di ottenere un risultato che soddisfi a pieno le esigenze, i gusti e la personalità del cliente.",
      },
      {
        _type: 'object',
        _key: 'cb4',
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Stampato | Pavicat',
      metaDescription: "Pavimenti in cemento stampato con estetica di roccia, ceramica, pietra e legno. Superfici monolitiche senza manutenzione. Pavicat, dal 1980 a Torino.",
    },
  })
  console.log(`✓ ${stampato.title} (${stampato._id}) - 3 card con testo + 1 solo immagine`)
}

run().catch(console.error)
