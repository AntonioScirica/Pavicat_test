import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const ctaPage = defineType({
  name: 'ctaPage',
  title: 'Pagina Contattaci (CTA)',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Contenuto',
      type: 'blockContent',
    }),
    defineField({
      name: 'benefits',
      title: 'Vantaggi / Punti di forza',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titolo', type: 'string' }),
            defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 2 }),
            defineField({ name: 'icon', title: 'Icona', type: 'imageWithAlt' }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'formHeading',
      title: 'Titolo form contatto',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pagina Contattaci (CTA)' }
    },
  },
})
