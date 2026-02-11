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
              description: 'Es: /servizi, /chi-siamo, /contattaci, /lavora-con-noi. Non necessario se ha sottomenu.',
              hidden: ({ parent }) => parent?.hasDropdown && parent?.dropdownType === 'custom',
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Ha sottomenu',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'dropdownType',
              title: 'Tipo sottomenu',
              type: 'string',
              options: {
                list: [
                  { title: 'Servizi (automatico)', value: 'services' },
                  { title: 'Link personalizzati', value: 'custom' },
                ],
              },
              hidden: ({ parent }) => !parent?.hasDropdown,
            }),
            defineField({
              name: 'subItems',
              title: 'Voci sottomenu',
              type: 'array',
              hidden: ({ parent }) => !parent?.hasDropdown || parent?.dropdownType !== 'custom',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Etichetta', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'href', title: 'URL', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'description', title: 'Descrizione', type: 'string' }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
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
