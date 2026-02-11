import { defineField, defineType } from 'sanity'

export const dividerBlock = defineType({
  name: 'dividerBlock',
  title: 'Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etichetta',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: '── Divider ──', subtitle: 'Linea separatrice' }
    },
  },
})
