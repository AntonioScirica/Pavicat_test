import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const docs = await client.fetch(`*[_type == "homePage"] { _id }`)
  console.log('homePage documents:', JSON.stringify(docs, null, 2))

  // Check if draft exists but published doesn't
  const draft = await client.fetch(`*[_id == "drafts.homePage"][0] { _id, "sectionsCount": count(sections) }`)
  const published = await client.fetch(`*[_id == "homePage"][0] { _id, "sectionsCount": count(sections) }`)
  console.log('Draft:', JSON.stringify(draft))
  console.log('Published:', JSON.stringify(published))
}

run().catch(console.error)
