import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const ctaPage = defineType({
  name: 'ctaPage',
  title: 'Pagina Contattaci (CTA)',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
        defineField({ name: 'grayscale', title: 'Bianco e nero', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sezioni',
      type: 'array',
      of: [
        { type: 'contactSectionBlock' },
        { type: 'downloadSectionBlock' },
        { type: 'allServicesGridBlock' },
        { type: 'heroSection' },
        { type: 'storySectionBlock' },
        { type: 'partnersSectionBlock' },
        { type: 'servicesSectionBlock' },
        { type: 'projectsSectionBlock' },
        { type: 'whyUsSectionBlock' },
        { type: 'ctaBlock' },
        { type: 'dividerBlock' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pagina Contattaci (CTA)' }
    },
  },
})
