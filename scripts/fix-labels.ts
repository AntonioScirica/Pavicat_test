import { getCliClient } from 'sanity/cli'
const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })
async function run() {
  const services = await client.fetch(`*[_type == "service" && !(_id in path("drafts.**"))]{ _id, title, category, pillLabel }`)
  for (const s of services) {
    await client.patch(s._id).set({ category: 'Cemento elicotterato', pillLabel: 'Cemento' }).commit()
    console.log(`✓ ${s.title} → categoria: "Cemento elicotterato", pillola: "Cemento"`)
  }
}
run().catch(console.error)
