import { defineField, defineType } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

export const allServicesGridBlock = defineType({
  name: 'allServicesGridBlock',
  title: 'Griglia Servizi',
  type: 'object',
  icon: ComponentIcon,
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
      return { title: 'Griglia Servizi', subtitle: 'Tutti i servizi con filtri categorie' }
    },
  },
})
