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
      name: 'pillLabel',
      title: 'Etichetta pillola',
      type: 'string',
      description: 'Testo mostrato sulla pillola nelle card (es: "Cemento elicotterato")',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Categoria per i filtri (es: Cemento, Resina, Rampe)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Secondo titolo',
      type: 'string',
      description: 'Titolo mostrato sotto l\'immagine nella pagina del servizio',
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
