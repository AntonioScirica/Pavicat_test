import { defineField, defineType } from 'sanity'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Blocco CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titolo',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Testo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      title: 'Testo pulsante',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link pulsante',
      type: 'link',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'white',
    }),
    defineField({
      name: 'bgImage',
      title: 'Immagine di sfondo',
      type: 'imageWithAlt',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Banner CTA', subtitle: 'CTA' }
    },
  },
})
