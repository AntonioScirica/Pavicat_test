import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const docs = await client.fetch(`*[_type == "projectsGalleryPage"] { _id, "imgCount": count(images), images[0] }`)
  console.log(JSON.stringify(docs, null, 2))
}

run().catch(console.error)
