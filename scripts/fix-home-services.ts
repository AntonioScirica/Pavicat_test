import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  // Get all current services
  const services = await client.fetch<{ _id: string; title: string }[]>(
    `*[_type == "service" && !(_id in path("drafts.**"))] | order(order asc) { _id, title }`
  )
  console.log(`Trovati ${services.length} servizi:`)
  services.forEach((s, i) => console.log(`  ${i + 1}. ${s.title} (${s._id})`))

  // Find the homePage and its servicesSectionBlock
  const homePage = await client.fetch<{ _id: string; sections: any[] } | null>(
    `*[_type == "homePage"][0]{ _id, sections }`
  )

  if (!homePage) {
    // Try drafts
    const draft = await client.fetch<{ _id: string; sections: any[] } | null>(
      `*[_id == "drafts.homePage"][0]{ _id, sections }`
    )
    if (!draft) {
      console.log('homePage non trovata')
      return
    }
    await updateHomePage(draft, services)
  } else {
    await updateHomePage(homePage, services)
  }
}

async function updateHomePage(homePage: { _id: string; sections: any[] }, services: { _id: string; title: string }[]) {
  const sections = homePage.sections || []
  const updated = sections.map((section: any) => {
    if (section._type === 'servicesSectionBlock') {
      console.log(`\nAggiornamento servicesSectionBlock con ${services.length} servizi...`)
      return {
        ...section,
        featuredServices: services.map((s) => ({
          _type: 'reference',
          _ref: s._id,
          _key: Math.random().toString(36).slice(2, 10),
        })),
      }
    }
    return section
  })

  await client.patch(homePage._id).set({ sections: updated }).commit()
  console.log('Home page aggiornata!')
}

run().catch(console.error)
