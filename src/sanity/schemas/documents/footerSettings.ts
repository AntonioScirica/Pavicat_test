import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  groups: [
    { name: 'content', title: 'Contenuti', default: true },
    { name: 'columns', title: 'Colonne link' },
    { name: 'contact', title: 'Contatti' },
    { name: 'social', title: 'Social' },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo footer',
      type: 'imageWithAlt',
      description: 'Se vuoto, usa il logo bianco dalle impostazioni sito',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 4,
      description: 'Breve testo sotto il logo',
      group: 'content',
    }),
    defineField({
      name: 'columns',
      title: 'Colonne link',
      type: 'array',
      group: 'columns',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titolo colonna',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Link',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Etichetta', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'href', title: 'URL', type: 'string', validation: (rule) => rule.required() }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
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
      name: 'contactInfo',
      title: 'Informazioni di contatto',
      type: 'contactInfo',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social media',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'social',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright',
      type: 'string',
      description: 'Es: © 2024 Pavicat. Tutti i diritti riservati.',
      group: 'content',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer' }
    },
  },
})
