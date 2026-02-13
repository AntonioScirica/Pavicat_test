import { defineQuery } from 'next-sanity'

export const projectsGalleryPageQuery = defineQuery(`
  *[_type == "projectsGalleryPage"][0] {
    hero,
    images,
    seo
  }
`)
