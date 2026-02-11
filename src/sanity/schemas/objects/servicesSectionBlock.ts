import { defineField, defineType } from 'sanity'

export const servicesSectionBlock = defineType({
  name: 'servicesSectionBlock',
  title: 'I Nostri Servizi',
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
      return { title: title || 'I Nostri Servizi', subtitle: 'Sezione servizi' }
    },
  },
})
