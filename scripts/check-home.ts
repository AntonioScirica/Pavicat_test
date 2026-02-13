import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const page = await client.fetch(`*[_type == "homePage"][0] { sections[] { _type, _key } }`)
  console.log('Sections:', JSON.stringify(page?.sections, null, 2))

  // Check for any null/broken references
  const full = await client.fetch(`*[_type == "homePage"][0] { sections[] { _type, ...select(_type == "servicesSectionBlock" => { "refs": featuredServices[]->._id }) } }`)
  console.log('\nService refs:', JSON.stringify(full?.sections?.filter((s: any) => s._type === 'servicesSectionBlock'), null, 2))
}

run().catch(console.error)
