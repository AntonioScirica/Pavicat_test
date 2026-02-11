import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const companyPage = defineType({
  name: 'companyPage',
  title: 'Pagina Azienda',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
      ],
    }),
    defineField({
      name: 'storySection',
      title: 'La nostra storia',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
        defineField({ name: 'body', title: 'Testo', type: 'blockContent' }),
        defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
        defineField({
          name: 'timeline',
          title: 'Timeline',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'year', title: 'Anno', type: 'string' }),
                defineField({ name: 'title', title: 'Titolo', type: 'string' }),
                defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 2 }),
              ],
              preview: {
                select: { title: 'year', subtitle: 'title' },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'valuesSection',
      title: 'I nostri valori',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
        defineField({
          name: 'values',
          title: 'Valori',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Titolo', type: 'string' }),
                defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3 }),
                defineField({ name: 'icon', title: 'Icona', type: 'imageWithAlt' }),
              ],
              preview: {
                select: { title: 'title' },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'teamSection',
      title: 'Il nostro team',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
        defineField({ name: 'subheading', title: 'Sottotitolo', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBlock',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pagina Azienda' }
    },
  },
})
