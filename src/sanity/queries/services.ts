import { defineQuery } from 'next-sanity'

export const servicesPageQuery = defineQuery(`
  *[_type == "servicesPage"][0] {
    hero,
    introText,
    ctaBanner,
    seo
  }
`)

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    featuredImage,
    features
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    featuredImage,
    gallery,
    body,
    features[] {
      title,
      description,
      icon
    },
    seo
  }
`)

export const allServiceSlugsQuery = defineQuery(`
  *[_type == "service"] { "slug": slug.current }
`)
