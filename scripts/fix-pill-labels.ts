import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

const pillLabels: Record<string, string> = {
  'pavimenti-cemento-elicotterato': 'Cemento elicotterato',
  'pavimenti-cemento-stampato': 'Cemento stampato',
  'pavimenti-cemento-acidificato': 'Cemento acidificato',
  'pavimenti-cemento-levigato-lucidato': 'Cemento levigato',
  'pavimenti-cemento-sasso-lavato': 'Sasso lavato',
  'rampe-cemento': 'Rampe antiscivolo',
  'pavimenti-resina': 'Resina',
}

async function run() {
  const services = await client.fetch<{ _id: string; slug: string; title: string }[]>(
    `*[_type == "service" && !(_id in path("drafts.**"))]{ _id, "slug": slug.current, title }`
  )

  for (const service of services) {
    const label = pillLabels[service.slug]
    if (label) {
      await client.patch(service._id).set({ pillLabel: label }).commit()
      console.log(`✓ ${service.title} → "${label}"`)
    }
  }
}

run().catch(console.error)
