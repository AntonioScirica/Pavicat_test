import { defineField, defineType } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Informazioni di contatto',
  type: 'object',
  fields: [
    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'piva',
      title: 'Partita IVA',
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Link Google Maps',
      type: 'url',
    }),
    defineField({
      name: 'mapEmbed',
      title: 'Codice embed mappa',
      type: 'text',
      rows: 4,
      description: 'Incolla qui il codice iframe di Google Maps',
    }),
  ],
})
