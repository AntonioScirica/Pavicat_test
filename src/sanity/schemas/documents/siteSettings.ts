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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Icona del sito (visibile nella tab del browser). Formato consigliato: PNG quadrato 32x32 o 180x180.',
      options: { hotspot: false },
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
