import { defineQuery } from 'next-sanity'
import { sectionsProjection } from './sections'

export const worksPageQuery = defineQuery(`
  *[_type == "worksPage"][0] {
    hero,
    ${sectionsProjection},
    seo
  }
`)

export const allWorksQuery = defineQuery(`
  *[_type == "work"] | order(order asc) {
    _id,
    title,
    category,
    "slug": slug.current,
    shortDescription,
    featuredImage,
    contentBlocks[] {
      _key,
      text,
      image
    }
  }
`)

export const workBySlugQuery = defineQuery(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    featuredImage,
    contentBlocks[] {
      text,
      image
    },
    seo
  }
`)

export const allWorkSlugsQuery = defineQuery(`
  *[_type == "work"] { "slug": slug.current }
`)
