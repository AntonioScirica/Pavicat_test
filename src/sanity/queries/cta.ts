import { defineQuery } from 'next-sanity'
import { sectionsProjection } from './sections'

export const ctaPageQuery = defineQuery(`
  *[_type == "ctaPage"][0] {
    hero,
    ${sectionsProjection},
    seo
  }
`)
