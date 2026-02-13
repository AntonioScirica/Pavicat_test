import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  // 1. Clean references from homePage
  const homePages = await client.fetch<{ _id: string; sections: any[] }[]>(
    `*[_type == "homePage"]{ _id, sections }`
  )
  for (const page of homePages) {
    if (!page.sections) continue
    const cleaned = page.sections.map((section: any) => {
      if (section._type === 'servicesSectionBlock') {
        const { featuredServices, ...rest } = section
        return rest
      }
      return section
    })
    await client.patch(page._id).set({ sections: cleaned }).commit()
    console.log(`Pulito ${page._id}`)
  }

  // 2. Delete all services
  const services = await client.fetch<string[]>(
    `*[_type == "service" || (_type == "service" && _id in path("drafts.**"))]._id`
  )
  if (services.length === 0) {
    console.log('Nessun servizio da eliminare')
    return
  }

  const tx = client.transaction()
  for (const id of services) {
    tx.delete(id)
  }
  await tx.commit()
  console.log(`Eliminati ${services.length} servizi`)
}

run().catch(console.error)
