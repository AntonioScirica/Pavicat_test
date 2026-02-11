import { defineQuery } from 'next-sanity'

export const contactsPageQuery = defineQuery(`
  *[_type == "contactsPage"][0] {
    hero,
    formHeading,
    formDescription,
    successMessage,
    showMap,
    seo
  }
`)
