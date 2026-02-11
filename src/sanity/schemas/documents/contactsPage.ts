import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contactsPage = defineType({
  name: 'contactsPage',
  title: 'Pagina Contatti',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'formHeading',
      title: 'Titolo form',
      type: 'string',
    }),
    defineField({
      name: 'formDescription',
      title: 'Descrizione form',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'successMessage',
      title: 'Messaggio dopo invio',
      type: 'text',
      rows: 2,
      description: 'Messaggio mostrato dopo l\'invio del form',
    }),
    defineField({
      name: 'showMap',
      title: 'Mostra mappa',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pagina Contatti' }
    },
  },
})
