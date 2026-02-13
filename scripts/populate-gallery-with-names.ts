import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const services = await client.fetch(`*[_type == "service"] | order(order asc) {
    title,
    contentBlocks[] { image }
  }`)

  const images: any[] = []
  for (const service of services) {
    if (service.contentBlocks) {
      for (const block of service.contentBlocks) {
        if (block.image?.image?.asset?._ref) {
          images.push({
            _type: 'imageWithAlt',
            _key: `img${images.length}`,
            image: block.image.image,
            alt: service.title,
          })
        }
      }
    }
  }

  console.log(`Trovate ${images.length} immagini`)

  await client
    .patch('projectsGalleryPage')
    .set({ images })
    .commit()

  console.log(`✓ Galleria aggiornata con nomi servizi`)
}

run().catch(console.error)
