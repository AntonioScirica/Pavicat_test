import { defineField, defineType } from 'sanity'
import { WrenchIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Servizio',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nome servizio',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Immagine principale',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'gallery',
      title: 'Galleria immagini',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'body',
      title: 'Contenuto completo',
      type: 'blockContent',
    }),
    defineField({
      name: 'features',
      title: 'Caratteristiche',
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
      name: 'order',
      title: 'Ordine visualizzazione',
      type: 'number',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Ordine manuale',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'featuredImage.image',
    },
  },
})
