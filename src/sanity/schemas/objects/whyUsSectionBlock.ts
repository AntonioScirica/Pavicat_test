import { defineField, defineType } from 'sanity'

export const whyUsSectionBlock = defineType({
  name: 'whyUsSectionBlock',
  title: 'Perchè Scegliere Noi',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
    defineField({ name: 'subheading', title: 'Sottotitolo', type: 'text', rows: 3 }),
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'white',
    }),
    defineField({
      name: 'values',
      title: 'Valori',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icona',
              type: 'string',
              options: {
                list: [
                  { title: 'Orologio (Esperienza)', value: 'clock' },
                  { title: 'Scudo (Affidabilità)', value: 'shield' },
                  { title: 'Award (Garanzia)', value: 'award' },
                  { title: 'Users (Onestà)', value: 'users' },
                ],
              },
            }),
            defineField({ name: 'title', title: 'Titolo', type: 'string' }),
            defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Perchè Scegliere Noi', subtitle: 'Sezione valori' }
    },
  },
})
