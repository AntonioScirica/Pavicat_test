import { defineField, defineType } from 'sanity'

export const partnersSectionBlock = defineType({
  name: 'partnersSectionBlock',
  title: 'Loghi Partner',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'white',
    }),
    defineField({
      name: 'logos',
      title: 'Loghi',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
      description: 'Loghi dei partner (Unical, Bricoman, Lidl, ecc.)',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Loghi Partner', subtitle: 'Sezione partner' }
    },
  },
})
