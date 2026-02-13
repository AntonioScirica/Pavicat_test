import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const allWorksGridBlock = defineType({
  name: 'allWorksGridBlock',
  title: 'Griglia Lavori',
  type: 'object',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'white',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Griglia Lavori', subtitle: 'Tutti i lavori con filtri categorie' }
    },
  },
})
