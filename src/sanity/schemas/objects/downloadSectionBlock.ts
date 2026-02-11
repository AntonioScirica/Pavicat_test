import { defineField, defineType } from 'sanity'
import { DownloadIcon } from '@sanity/icons'

export const downloadSectionBlock = defineType({
  name: 'downloadSectionBlock',
  title: 'Sezione Download',
  type: 'object',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Testo',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'buttonText',
      title: 'Testo pulsante',
      type: 'string',
      initialValue: 'Download Brochure',
    }),
    defineField({
      name: 'file',
      title: 'File da scaricare',
      type: 'file',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Colore sfondo',
      type: 'string',
      options: { list: [{ title: 'Bianco', value: 'white' }, { title: 'Grigio', value: 'gray' }] },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: { title: 'buttonText' },
    prepare({ title }) {
      return { title: title || 'Sezione Download', subtitle: 'Download' }
    },
  },
})
