import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  // Fetch all images from service contentBlocks
  const services = await client.fetch(`*[_type == "service"] | order(order asc) {
    title,
    featuredImage,
    contentBlocks[] { image }
  }`)

  const images: any[] = []
  for (const service of services) {
    if (service.contentBlocks) {
      for (const block of service.contentBlocks) {
        if (block.image?.image?.asset?._ref) {
          images.push(block.image)
        }
      }
    }
  }

  console.log(`Trovate ${images.length} immagini dai servizi`)

  // Update projectsGalleryPage
  await client
    .patch('projectsGalleryPage')
    .set({ images })
    .commit()

  console.log(`✓ Galleria aggiornata con ${images.length} immagini`)
}

run().catch(console.error)
