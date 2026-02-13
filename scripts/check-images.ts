import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const services = await client.fetch(`*[_type == "service"] | order(order asc) { _id, title, "hasFeaturedImage": defined(featuredImage), "hasContentBlockImages": count(contentBlocks[defined(image)]) }`)
  console.log(JSON.stringify(services, null, 2))
}

run().catch(console.error)
