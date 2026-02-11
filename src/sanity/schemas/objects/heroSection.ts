import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Sezione Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge / Etichetta',
      type: 'string',
      description: 'Es. "Pavimentazioni Catalano"',
    }),
    defineField({
      name: 'title',
      title: 'Titolo principale',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Descrizione laterale',
      type: 'text',
      rows: 3,
      description: 'Testo mostrato a destra del titolo',
    }),
    defineField({
      name: 'image',
      title: 'Immagine di sfondo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'ctaText',
      title: 'Testo pulsante CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link CTA',
      type: 'link',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Sezione Hero', subtitle: 'Hero' }
    },
  },
})
