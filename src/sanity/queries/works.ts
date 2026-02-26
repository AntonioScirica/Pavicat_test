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
    location,
    date,
    "slug": slug.current,
    shortDescription,
    featuredImage
  }
`)

export const workBySlugQuery = defineQuery(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    category,
    location,
    date,
    shortDescription,
    featuredImage,
    gallery,
    seo
  }
`)

export const allWorkSlugsQuery = defineQuery(`
  *[_type == "work"] { "slug": slug.current }
`)
