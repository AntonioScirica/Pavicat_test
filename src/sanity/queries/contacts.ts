import { defineQuery } from 'next-sanity'
import { sectionsProjection } from './sections'

export const contactsPageQuery = defineQuery(`
  *[_type == "contactsPage"][0] {
    hero,
    ${sectionsProjection},
    seo
  }
`)
