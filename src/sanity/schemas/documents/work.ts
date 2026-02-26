import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const work = defineType({
  name: 'work',
  title: 'Progetto',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nome progetto',
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
      name: 'category',
      title: 'Categoria',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Località',
      type: 'string',
      description: 'Es. "Roma, RM" o "Milano, MI"',
    }),
    defineField({
      name: 'date',
      title: 'Data realizzazione',
      type: 'date',
      options: {
        dateFormat: 'MM/YYYY',
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Secondo titolo',
      type: 'string',
      description: 'Titolo mostrato sotto l\'immagine nella pagina del progetto',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.max(500),
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
      subtitle: 'category',
      media: 'featuredImage.image',
    },
  },
})
