import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const homePage = await client.fetch(`*[_type == "homePage"][0] { _id, sections }`)
  if (!homePage) {
    console.log('Home page non trovata')
    return
  }

  const sectionIndex = homePage.sections?.findIndex(
    (s: any) => s._type === 'projectsSectionBlock'
  )

  if (sectionIndex === -1 || sectionIndex === undefined) {
    console.log('projectsSectionBlock non trovato nelle sezioni')
    return
  }

  console.log(`Trovato projectsSectionBlock all'indice ${sectionIndex}`)
  console.log(`ctaHref attuale: ${homePage.sections[sectionIndex].ctaHref || '(vuoto)'}`)

  await client
    .patch(homePage._id)
    .set({ [`sections[${sectionIndex}].ctaHref`]: '/progetti' })
    .commit()

  console.log('✓ ctaHref aggiornato a /progetti')
}

run().catch(console.error)
