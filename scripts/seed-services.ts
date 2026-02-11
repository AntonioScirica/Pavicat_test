import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '24ap8lkp',
  dataset: 'production',
  apiVersion: '2024-07-11',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const services = [
  {
    _type: 'service' as const,
    title: 'Pavimentazioni in Calcestruzzo',
    slug: { _type: 'slug' as const, current: 'pavimentazioni-calcestruzzo' },
    shortDescription: 'Realizziamo pavimentazioni industriali e civili in calcestruzzo di alta qualità, resistenti e durevoli nel tempo.',
    order: 1,
  },
  {
    _type: 'service' as const,
    title: 'Trattamenti in Resina',
    slug: { _type: 'slug' as const, current: 'trattamenti-resina' },
    shortDescription: 'Applicazione di trattamenti in resina per pavimenti industriali, commerciali e residenziali.',
    order: 2,
  },
  {
    _type: 'service' as const,
    title: 'Rampe Veicolari',
    slug: { _type: 'slug' as const, current: 'rampe-veicolari' },
    shortDescription: 'Progettazione e realizzazione di rampe veicolari in cemento per accessi industriali e commerciali.',
    order: 3,
  },
]

async function seed() {
  const transaction = client.transaction()
  for (const service of services) {
    transaction.create(service)
  }
  const result = await transaction.commit()
  console.log('Servizi creati:', result.documentIds)
}

seed().catch(console.error)
