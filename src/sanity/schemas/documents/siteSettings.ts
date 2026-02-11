import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'logoWhite',
      title: 'Logo (versione bianca)',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'siteName',
      title: 'Nome sito',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'SEO predefinito',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Impostazioni Sito' }
    },
  },
})
