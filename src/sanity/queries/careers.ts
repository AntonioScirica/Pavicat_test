import { defineQuery } from 'next-sanity'
import { sectionsProjection } from './sections'

export const careersPageQuery = defineQuery(`
  *[_type == "careersPage"][0] {
    hero,
    ${sectionsProjection},
    seo
  }
`)
