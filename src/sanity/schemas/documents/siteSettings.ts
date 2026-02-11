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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'siteName',
      title: 'Nome sito',
      type: 'string',
    }),
    defineField({
      name: 'siteTagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informazioni di contatto',
      type: 'contactInfo',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social media',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'footerText',
      title: 'Testo footer',
      type: 'blockContent',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Colonne footer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titolo colonna',
              type: 'string',
            }),
            defineField({
              name: 'links',
              title: 'Link',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Etichetta', type: 'string' }),
                    defineField({ name: 'href', title: 'URL', type: 'string' }),
                  ],
                  preview: {
                    select: { title: 'label' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright',
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
