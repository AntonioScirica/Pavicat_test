import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titolo Meta',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Il titolo dovrebbe essere al massimo 60 caratteri'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descrizione Meta',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('La descrizione dovrebbe essere al massimo 160 caratteri'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Immagine Open Graph',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Nascondi dai motori di ricerca',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
