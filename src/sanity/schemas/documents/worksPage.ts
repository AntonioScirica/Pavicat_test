import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const worksPage = defineType({
  name: 'worksPage',
  title: 'Pagina Lavori',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo pagina', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
        defineField({ name: 'grayscale', title: 'Bianco e nero', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sezioni',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'storySectionBlock' },
        { type: 'partnersSectionBlock' },
        { type: 'servicesSectionBlock' },
        { type: 'projectsSectionBlock' },
        { type: 'whyUsSectionBlock' },
        { type: 'ctaBlock' },
        { type: 'dividerBlock' },
        { type: 'contactSectionBlock' },
        { type: 'downloadSectionBlock' },
        { type: 'allWorksGridBlock' },
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
      return { title: 'Pagina Lavori' }
    },
  },
})
