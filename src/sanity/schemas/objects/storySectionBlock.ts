import { defineField, defineType } from 'sanity'

export const storySectionBlock = defineType({
  name: 'storySectionBlock',
  title: 'La Nostra Storia',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
    defineField({ name: 'text', title: 'Testo', type: 'text', rows: 6 }),
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
