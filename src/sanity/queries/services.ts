import { defineQuery } from 'next-sanity'
import { sectionsProjection } from './sections'

export const servicesPageQuery = defineQuery(`
  *[_type == "servicesPage"][0] {
    hero,
    ${sectionsProjection},
    seo
  }
`)

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
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

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    shortDescription,
    featuredImage,
    gallery,
    seo
  }
`)

export const allServiceSlugsQuery = defineQuery(`
  *[_type == "service"] { "slug": slug.current }
`)
