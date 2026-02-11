import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const contactsPage = defineType({
  name: 'contactsPage',
  title: 'Chi Siamo',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Immagine di sfondo', type: 'imageWithAlt' }),
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
      return { title: 'Chi Siamo' }
    },
  },
})
