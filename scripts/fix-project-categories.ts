import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  // Get services with their first image
  const services = await client.fetch(`*[_type == "service"] | order(order asc) {
    title,
    category,
    featuredImage
  }`)

  // Get current home page projectsSectionBlock
  const homePage = await client.fetch(`*[_type == "homePage"][0] { _id, sections }`)
  const sectionIndex = homePage.sections?.findIndex(
    (s: any) => s._type === 'projectsSectionBlock'
  )

  if (sectionIndex === -1 || sectionIndex === undefined) {
    console.log('projectsSectionBlock non trovato')
    return
  }

  const categories = homePage.sections[sectionIndex].categories || []
  console.log('Categorie attuali:', categories.map((c: any) => c.title))

  // Match categories to service images
  const updated = categories.map((cat: any) => {
    const catTitle = cat.title?.toLowerCase() || ''
    const match = services.find((s: any) => {
      const serviceTitle = s.title?.toLowerCase() || ''
      const serviceCategory = s.category?.toLowerCase() || ''
      return serviceTitle.includes(catTitle) || catTitle.includes(serviceCategory.split(' ').pop() || '')
    })

    if (match?.featuredImage) {
      console.log(`✓ "${cat.title}" → immagine da "${match.title}"`)
      return { ...cat, image: match.featuredImage }
    }
    console.log(`✗ "${cat.title}" → nessun match`)
    return cat
  })

  await client
    .patch(homePage._id)
    .set({ [`sections[${sectionIndex}].categories`]: updated })
    .commit()

  console.log('\n✓ Categorie aggiornate con immagini')
}

run().catch(console.error)
