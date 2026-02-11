import { defineQuery } from 'next-sanity'

export const ctaPageQuery = defineQuery(`
  *[_type == "ctaPage"][0] {
    hero,
    body,
    benefits[] {
      title,
      description,
      icon
    },
    formHeading,
    seo
  }
`)
