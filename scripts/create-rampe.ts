import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const service = await client.create({
    _type: 'service',
    title: 'Rampe in cemento antiscivolo',
    slug: { _type: 'slug', current: 'rampe-cemento' },
    pillLabel: 'Rampe',
    category: 'Rampe antiscivolo',
    shortDescription: "Rampe di accesso veicolare in calcestruzzo, robuste e resistenti nel tempo. Finiture pettinata e a spina di pesce.",
    order: 2,
    contentBlocks: [
      {
        _type: 'object',
        _key: 'cb1',
        text: "Per le caratteristiche di robustezza e resistenza nel tempo, le rampe di accesso veicolare si realizzano comunemente in calcestruzzo.",
      },
      {
        _type: 'object',
        _key: 'cb2',
        text: "Due tipi di finiture: pettinata e a spina di pesce. Quest'ultima si realizza incidendo a fresco lo strato di quarzo-cemento con degli stampi appositi, la superficie che si ottiene favorisce l'aderenza degli pneumatici anche in condizioni difficili.",
      },
      {
        _type: 'object',
        _key: 'cb3',
        text: "La tipologia pettinata è maggiormente consigliata per passaggi pedonali e carrozzine.",
      },
      {
        _type: 'object',
        _key: 'cb4',
        text: "Le rampe in calcestruzzo sono utilizzate in abitazioni private, centri commerciali, garage, autosilo e industrie.",
      },
      {
        _type: 'object',
        _key: 'cb5',
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Rampe in Cemento Antiscivolo | Pavicat',
      metaDescription: "Rampe veicolari e pedonali in calcestruzzo antiscivolo. Finiture pettinata e a spina di pesce. Pavicat, dal 1980 a Torino.",
    },
  })

  console.log(`✓ Creato: ${service.title} (${service._id})`)
}

run().catch(console.error)
