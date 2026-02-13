import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const page = await client.fetch(`*[_type == "homePage"][0] { sections[] { _type, ...select(_type == "projectsSectionBlock" => { heading, ctaText, ctaHref, categories[] { title, href } }) } }`)
  const projectSection = page?.sections?.find((s: any) => s._type === 'projectsSectionBlock')
  console.log(JSON.stringify(projectSection, null, 2))
}

run().catch(console.error)
