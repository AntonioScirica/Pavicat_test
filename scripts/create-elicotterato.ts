import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const service = await client.create({
    _type: 'service',
    title: 'Pavimenti in cemento elicotterato',
    slug: { _type: 'slug', current: 'pavimenti-cemento-elicotterato' },
    pillLabel: 'Cemento elicotterato',
    category: 'Cemento',
    shortDescription: "Uniscono praticità d'uso e gradevole effetto estetico. Hanno un'elevata resistenza all'usura, all'urto e lunga durata nel tempo.",
    order: 1,
    contentBlocks: [
      {
        _type: 'object',
        _key: 'cb1',
        text: "Il cemento armato lavorato con indurente al quarzo, è composto principalmente da cemento, acqua ed inerti miscelati tra di loro in dosi corrette, il risultato è molto resistente con un ottimo livello di permeabilità.",
      },
      {
        _type: 'object',
        _key: 'cb2',
        text: "Ha diversi utilizzi nel settore dell'edilizia per le sue caratteristiche di resistenza e durezza.",
      },
      {
        _type: 'object',
        _key: 'cb3',
        text: "Consigliamo questa tipologia di pavimentazione per infrastrutture, grandi opere, aree industriali, magazzini, piazzali, parcheggi e altre tipi di superfici che necessitano di basi d'appoggio sicure e forti.",
      },
      {
        _type: 'object',
        _key: 'cb4',
        text: "Ci operiamo per garantire al cliente il miglior risultato funzionale con finiture superficiali di alta qualità meccanica con possibilità di scelta di differenti colorazioni sia per la lavorazione a spolvero che a pastina.",
      },
      {
        _type: 'object',
        _key: 'cb5',
      },
      {
        _type: 'object',
        _key: 'cb6',
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Elicotterato | Pavicat',
      metaDescription: "Pavimenti industriali in cemento elicotterato ad alta resistenza. Ideali per capannoni, magazzini, piazzali e parcheggi. Pavicat, dal 1980 a Torino.",
    },
  })

  console.log(`✓ Creato: ${service.title} (${service._id})`)
}

run().catch(console.error)
