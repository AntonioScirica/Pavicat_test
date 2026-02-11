import { defineField, defineType } from 'sanity'

export const storySectionBlock = defineType({
  name: 'storySectionBlock',
  title: 'La Nostra Storia',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
    defineField({ name: 'text', title: 'Testo', type: 'text', rows: 6 }),
    defineField({
      name: 'buttonText',
      title: 'Testo pulsante',
      type: 'string',
      description: 'Es: Guarda il video',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link pulsante',
      type: 'url',
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),
    defineField({
      name: 'buttonIcon',
      title: 'Icona pulsante',
      type: 'string',
      options: {
        list: [
          { title: 'Play', value: 'play' },
          { title: 'Freccia destra', value: 'arrow' },
          { title: 'Download', value: 'download' },
          { title: 'Telefono', value: 'phone' },
          { title: 'Nessuna', value: 'none' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'La Nostra Storia', subtitle: 'Sezione storia' }
    },
  },
})
