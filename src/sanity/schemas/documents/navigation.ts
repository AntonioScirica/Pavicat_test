import { defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigazione',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Navigazione principale',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Etichetta',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              description: 'Es: /servizi, /azienda, /contatti',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Ha sottomenu',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Pulsante CTA nella navigazione',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Etichetta',
          type: 'string',
        }),
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigazione' }
    },
  },
})
