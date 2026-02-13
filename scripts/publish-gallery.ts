import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  const draft = await client.fetch(`*[_id == "drafts.projectsGalleryPage"][0]`)
  if (!draft) {
    console.log('Nessuna bozza trovata')
    return
  }

  // Create published version
  const published = { ...draft, _id: 'projectsGalleryPage' }
  await client.createOrReplace(published)

  // Delete draft
  await client.delete('drafts.projectsGalleryPage')

  console.log(`✓ Pubblicata pagina galleria con ${draft.images?.length || 0} immagini`)
}

run().catch(console.error)
