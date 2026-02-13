import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const projectsGalleryPage = defineType({
  name: 'projectsGalleryPage',
  title: 'Pagina Progetti (Galleria)',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo pagina', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
        defineField({ name: 'grayscale', title: 'Bianco e nero', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Galleria immagini',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pagina Progetti (Galleria)' }
    },
  },
})
