import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const homePage = await client.fetch(`*[_type == "homePage"][0] { _id, sections }`)
  const sectionIndex = homePage.sections.findIndex(
    (s: any) => s._type === 'projectsSectionBlock'
  )

  const categories = homePage.sections[sectionIndex].categories
  const acidIndex = categories.findIndex((c: any) => c.title === 'CEMENTO ACIDIFATO')

  if (acidIndex === -1) {
    console.log('Categoria non trovata')
    return
  }

  // Get acidificato service image
  const service = await client.fetch(`*[_type == "service" && title match "acidificato"][0] { featuredImage }`)

  categories[acidIndex].title = 'CEMENTO ACIDIFICATO'
  categories[acidIndex].image = service.featuredImage

  await client
    .patch(homePage._id)
    .set({ [`sections[${sectionIndex}].categories`]: categories })
    .commit()

  console.log('✓ Corretto "ACIDIFATO" → "ACIDIFICATO" con immagine')
}

run().catch(console.error)
