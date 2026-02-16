import { defineField, defineType } from 'sanity'

export const servicesSectionBlock = defineType({
  name: 'servicesSectionBlock',
  title: 'Prodotti e Servizi',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo sezione', type: 'string' }),
    defineField({ name: 'subheading', title: 'Sottotitolo', type: 'text', rows: 3 }),
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'white',
    }),
    defineField({
      name: 'featuredServices',
      title: 'Servizi in evidenza',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Prodotti e Servizi', subtitle: 'Sezione servizi' }
    },
  },
})
