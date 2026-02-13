import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

const categoryMap: Record<string, string> = {
  'pavimenti-cemento-elicotterato': 'Cemento',
  'pavimenti-cemento-stampato': 'Cemento',
  'pavimenti-cemento-acidificato': 'Cemento',
  'pavimenti-cemento-levigato-lucidato': 'Cemento',
  'pavimenti-cemento-sasso-lavato': 'Cemento',
  'rampe-cemento': 'Rampe',
  'pavimenti-resina': 'Resina',
}

async function run() {
  const services = await client.fetch<{ _id: string; slug: string; title: string }[]>(
    `*[_type == "service" && !(_id in path("drafts.**"))]{ _id, "slug": slug.current, title }`
  )

  for (const service of services) {
    const newCategory = categoryMap[service.slug]
    if (newCategory) {
      await client.patch(service._id).set({ category: newCategory }).commit()
      console.log(`✓ ${service.title} → ${newCategory}`)
    }
  }
}

run().catch(console.error)
