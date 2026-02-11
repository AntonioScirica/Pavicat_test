import { defineField, defineType } from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Immagine con testo alternativo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Testo alternativo',
      type: 'string',
      description: 'Descrizione dell\'immagine per accessibilità e SEO',
      validation: (rule) => rule.required().error('Il testo alternativo è obbligatorio'),
    }),
  ],
})
