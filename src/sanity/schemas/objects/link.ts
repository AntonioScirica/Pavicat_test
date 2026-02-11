import { defineField, defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
      title: 'Tipo di link',
      type: 'string',
      options: {
        list: [
          { title: 'Interno', value: 'internal' },
          { title: 'Esterno', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internal',
      title: 'Pagina interna',
      type: 'reference',
      to: [
        { type: 'homePage' },
        { type: 'servicesPage' },
        { type: 'contactsPage' },
        { type: 'ctaPage' },
        { type: 'careersPage' },
        { type: 'service' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'external',
      title: 'URL esterno',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
  ],
})
