import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Membro del team',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome e cognome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Ruolo',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'bio',
      title: 'Biografia',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Ordine visualizzazione',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Ordine manuale',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo.image',
    },
  },
})
