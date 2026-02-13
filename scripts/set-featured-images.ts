import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const services = await client.fetch(`*[_type == "service"] | order(order asc) {
    _id, title,
    "firstImage": contentBlocks[defined(image)][0].image
  }`)

  for (const service of services) {
    if (service.firstImage) {
      await client
        .patch(service._id)
        .set({ featuredImage: service.firstImage })
        .commit()
      console.log(`✓ ${service.title} — featuredImage impostata`)
    } else {
      console.log(`✗ ${service.title} — nessuna immagine nei contentBlocks`)
    }
  }
}

run().catch(console.error)
