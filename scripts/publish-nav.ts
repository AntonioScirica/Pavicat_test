import { getCliClient } from 'sanity/cli'
const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  // Get the draft navigation
  const draft = await client.fetch(`*[_id == "drafts.navigation"][0]`)
  if (!draft) {
    console.log('Nessun draft da pubblicare')
    return
  }

  // Also keep the Contatti item from published
  const published = await client.fetch(`*[_id == "navigation"][0]{ mainNav }`)
  const contatti = published?.mainNav?.find((item: any) => item.label === 'Contatti')

  // Merge: use draft mainNav + add Contatti if missing
  const draftNav = draft.mainNav || []
  const hasContatti = draftNav.some((item: any) => item.label === 'Contatti')
  if (!hasContatti && contatti) {
    draftNav.push(contatti)
  }

  // Update published document with draft data
  await client.createOrReplace({
    ...draft,
    _id: 'navigation',
    mainNav: draftNav,
  })

  // Delete the draft
  await client.delete('drafts.navigation')

  console.log('Navigazione pubblicata!')
  console.log('Items:', draftNav.map((i: any) => `${i.label} (dropdown: ${i.hasDropdown}, type: ${i.dropdownType || '-'})`).join(', '))
}

run().catch(console.error)
