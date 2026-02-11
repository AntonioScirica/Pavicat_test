import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  groups: [
    { name: 'content', title: 'Contenuti', default: true },
    { name: 'columns', title: 'Colonne' },
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
      name: 'columns',
      title: 'Colonne',
      description: 'Trascina per riordinare. La colonna Contatti può essere posizionata dove vuoi.',
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
              name: 'columnType',
              title: 'Tipo colonna',
              type: 'string',
              options: {
                list: [
                  { title: 'Link manuali', value: 'links' },
                  { title: 'Servizi (automatico)', value: 'services' },
                  { title: 'Contatti (info azienda)', value: 'contacts' },
                ],
              },
              initialValue: 'links',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Link',
              type: 'array',
              hidden: ({ parent }) => parent?.columnType !== 'links',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Etichetta', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'href', title: 'URL', type: 'string', description: 'Non necessario se è un file da scaricare', hidden: ({ parent }) => !!parent?.file }),
                    defineField({ name: 'file', title: 'File da scaricare', type: 'file', description: 'Se presente, il link scarica questo file' }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            }),
            defineField({
              name: 'contactItems',
              title: 'Voci contatto',
              description: 'Trascina per riordinare le voci',
              type: 'array',
              hidden: ({ parent }) => parent?.columnType !== 'contacts',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'itemType',
                      title: 'Tipo',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Azienda', value: 'company' },
                          { title: 'Indirizzo', value: 'address' },
                          { title: 'P.Iva / CF', value: 'piva' },
                          { title: 'PEC', value: 'pec' },
                          { title: 'Codice SDI', value: 'sdi' },
                          { title: 'Telefono', value: 'phone' },
                          { title: 'Email', value: 'email' },
                          { title: 'Etichetta custom', value: 'custom' },
                        ],
                      },
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'label',
                      title: 'Etichetta',
                      type: 'string',
                      description: 'Prefisso mostrato prima del valore (es: "Rea:")',
                      hidden: ({ parent }) => parent?.itemType !== 'custom',
                    }),
                    defineField({
                      name: 'value',
                      title: 'Valore',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: { itemType: 'itemType', value: 'value', label: 'label' },
                    prepare({ itemType, value, label }) {
                      const labels: Record<string, string> = {
                        company: 'Azienda',
                        address: 'Indirizzo',
                        piva: 'P.Iva/CF',
                        pec: 'PEC',
                        sdi: 'SDI',
                        phone: 'Telefono',
                        email: 'Email',
                        custom: label || 'Custom',
                      }
                      return { title: labels[itemType] || itemType, subtitle: value }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title', columnType: 'columnType' },
            prepare({ title, columnType }) {
              const types: Record<string, string> = { links: 'Link manuali', services: 'Servizi (auto)', contacts: 'Contatti' }
              return { title: title || 'Colonna', subtitle: types[columnType] || columnType }
            },
          },
        },
      ],
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
