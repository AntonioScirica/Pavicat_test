import { getCliClient } from 'sanity/cli'
const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const published = await client.fetch(`*[_type == "navigation" && !(_id in path("drafts.**"))][0]{ _id, mainNav }`)
  const draft = await client.fetch(`*[_id == "drafts.navigation"][0]{ _id, mainNav }`)
  console.log('=== PUBLISHED ===')
  console.log(JSON.stringify(published, null, 2))
  console.log('\n=== DRAFT ===')
  console.log(JSON.stringify(draft, null, 2))
}

run().catch(console.error)
