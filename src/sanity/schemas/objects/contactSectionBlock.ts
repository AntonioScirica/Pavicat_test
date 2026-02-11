import { defineField, defineType } from 'sanity'

export const contactSectionBlock = defineType({
  name: 'contactSectionBlock',
  title: 'Sezione Contatti',
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
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Link Google Maps',
      type: 'string',
      description: 'URL di Google Maps per l\'indirizzo',
    }),
    defineField({
      name: 'hours',
      title: 'Orari',
      type: 'string',
      description: 'Es: Lun - Sab: 7.00 - 18:00',
    }),
    defineField({
      name: 'formHeading',
      title: 'Titolo form',
      type: 'string',
    }),
    defineField({
      name: 'successMessage',
      title: 'Messaggio dopo invio',
      type: 'text',
      rows: 2,
      description: 'Messaggio mostrato dopo l\'invio del form',
    }),
  ],
  preview: {
    select: { phone: 'phone', email: 'email' },
    prepare({ phone, email }) {
      return {
        title: 'Sezione Contatti',
        subtitle: [phone, email].filter(Boolean).join(' · ') || 'Info + Form',
      }
    },
  },
})
