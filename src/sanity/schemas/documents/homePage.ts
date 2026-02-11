import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Pagina Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
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
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pagina Home' }
    },
  },
})
