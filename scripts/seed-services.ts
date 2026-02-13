import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

const services = [
  {
    title: 'Pavimenti in cemento elicotterato',
    slug: 'pavimenti-cemento-elicotterato',
    category: 'Cemento elicotterato',
    shortDescription:
      "Uniscono praticità d'uso e gradevole effetto estetico. Hanno un'elevata resistenza all'usura, all'urto e lunga durata nel tempo.",
    order: 1,
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Elicotterato | Pavicat',
      metaDescription:
        'Pavimenti industriali in cemento elicotterato ad alta resistenza. Ideali per capannoni, cortili e parcheggi. Pavicat, dal 1980 a Torino.',
    },
  },
  {
    title: 'Pavimenti in cemento stampato',
    slug: 'pavimenti-cemento-stampato',
    category: 'Cemento stampato',
    shortDescription:
      "Superficie monolitica che unisce la praticità del calcestruzzo all'estetica di pietra naturale, ceramica o legno. Minima manutenzione.",
    order: 2,
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Stampato | Pavicat',
      metaDescription:
        'Pavimenti in cemento stampato personalizzabili con colori e pattern decorativi. Effetto pietra, ceramica o legno. Pavicat Torino.',
    },
  },
  {
    title: 'Pavimenti in cemento acidificato',
    slug: 'pavimenti-cemento-acidificato',
    category: 'Cemento acidificato',
    shortDescription:
      'Effetto scenico, aspetto moderno, praticità di pulizia e manutenzione. Sfumature e effetti cromatici unici e permanenti.',
    order: 3,
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Acidificato | Pavicat',
      metaDescription:
        'Pavimenti acidificati con effetti cromatici unici e permanenti. Ideali per showroom, negozi e centri commerciali. Pavicat Torino.',
    },
  },
  {
    title: 'Pavimenti in cemento levigato e lucidato',
    slug: 'pavimenti-cemento-levigato-lucidato',
    category: 'Cemento levigato',
    shortDescription:
      "Resistenza all'abrasione elevatissima, traspirabile, con superficie lucida come il vetro. Facile da pulire.",
    order: 4,
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Levigato e Lucidato | Pavicat',
      metaDescription:
        'Pavimenti in cemento levigato e lucidato con finitura a specchio. Durezza aumentata fino al 500%. Pavicat Torino.',
    },
  },
  {
    title: 'Pavimenti in cemento sasso lavato',
    slug: 'pavimenti-cemento-sasso-lavato',
    category: 'Cemento sasso lavato',
    shortDescription:
      'Pavimentazione ottenuta mescolando al cemento sassi di fiume o pietra naturale. La migliore alternativa alla ghiaia.',
    order: 5,
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Sasso Lavato | Pavicat',
      metaDescription:
        'Pavimenti in sasso lavato per piazze, marciapiedi, piscine e giardini. Antiscivolo e durevoli. Pavicat Torino.',
    },
  },
  {
    title: 'Rampe in cemento antiscivolo',
    slug: 'rampe-cemento',
    category: 'Rampe antiscivolo',
    shortDescription:
      "La miglior soluzione per funzionalità e aspetto estetico. Realizzate in calcestruzzo lavorato 'pettinato' o 'spina di pesce'.",
    order: 6,
    seo: {
      _type: 'seo',
      metaTitle: 'Rampe in Cemento Antiscivolo | Pavicat',
      metaDescription:
        'Rampe veicolari e pedonali in cemento antiscivolo. Finitura pettinata o spina di pesce. Pavicat Torino.',
    },
  },
  {
    title: 'Pavimenti in resina',
    slug: 'pavimenti-resina',
    category: 'Resina',
    shortDescription:
      'Superfici continue e igieniche, resistenti a sostanze chimiche e usura. Soluzioni eco-sostenibili e personalizzabili.',
    order: 7,
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Resina | Pavicat',
      metaDescription:
        'Pavimenti in resina per ambienti industriali, commerciali e residenziali. Resistenti, igienici e personalizzabili. Pavicat Torino.',
    },
  },
]

async function run() {
  // 1. Find all documents that reference services and clear those references
  console.log('Pulizia riferimenti ai vecchi servizi...')
  const oldIds: string[] = await client.fetch('*[_type == "service" && !(_id in path("drafts.**"))]._id')

  // Find sections in homePage that reference old services and unset featuredServices
  const homePages = ['homePage', 'drafts.homePage']
  for (const hpId of homePages) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hp: any = await client.getDocument(hpId)
      if (hp?.sections) {
        const updatedSections = hp.sections.map((s: { _type: string; featuredServices?: unknown[] }) => {
          if (s._type === 'servicesSectionBlock' && s.featuredServices) {
            const { featuredServices, ...rest } = s
            void featuredServices
            return rest
          }
          return s
        })
        await client.patch(hpId).set({ sections: updatedSections }).commit()
        console.log(`  Pulito ${hpId}`)
      }
    } catch {
      // document doesn't exist
    }
  }

  // 2. Delete old services (published + drafts)
  console.log('Rimozione vecchi servizi...')
  const allOldIds: string[] = await client.fetch('*[_type == "service"]._id')
  if (allOldIds.length > 0) {
    const delMutations = allOldIds.map((id) => ({ delete: { id } }))
    await client.mutate(delMutations)
    console.log(`  Rimossi ${allOldIds.length} documenti`)
  }

  // 3. Create new services
  console.log('Creazione 7 servizi...')
  const createMutations = services.map((s) => ({
    create: {
      _type: 'service' as const,
      title: s.title,
      slug: { _type: 'slug' as const, current: s.slug },
      category: s.category,
      shortDescription: s.shortDescription,
      order: s.order,
      seo: s.seo,
    },
  }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await client.mutate(createMutations)
  console.log(`Creati ${result.results.length} servizi:`)
  result.results.forEach((r: { id: string }, i: number) => {
    console.log(`  ${i + 1}. ${services[i].title} (${services[i].slug}) -> ${r.id}`)
  })
}

run().catch(console.error)
