import { defineField, defineType } from 'sanity'

export const projectsSectionBlock = defineType({
  name: 'projectsSectionBlock',
  title: 'Progetti Realizzati',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
    defineField({ name: 'subheading', title: 'Sottotitolo', type: 'text', rows: 3 }),
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'gray',
    }),
    defineField({
      name: 'stats',
      title: 'Statistiche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Valore', type: 'string', description: 'Es. "500+"' }),
            defineField({ name: 'label', title: 'Etichetta', type: 'string', description: 'Es. "PROGETTI"' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'featuredWorks',
      title: 'Progetti in evidenza',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'work' }] }],
      description: 'Seleziona almeno 8 progetti da mostrare in homepage',
    }),
    defineField({
      name: 'categories',
      title: 'Categorie progetti (legacy)',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Nome categoria', type: 'string' }),
            defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', media: 'image.image' },
          },
        },
      ],
    }),
    defineField({ name: 'ctaText', title: 'Testo pulsante', type: 'string', initialValue: 'Vedi altri progetti' }),
    defineField({ name: 'ctaHref', title: 'Link pulsante', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Progetti Realizzati', subtitle: 'Sezione progetti' }
    },
  },
})
