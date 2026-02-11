import { defineField, defineType } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Link Social',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Piattaforma',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Custom', value: 'custom' },
        ],
      },
    }),
    defineField({
      name: 'label',
      title: 'Etichetta',
      type: 'string',
      description: 'Nome mostrato nel footer',
      hidden: ({ parent }) => parent?.platform !== 'custom',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'URL completo (https://...) o percorso relativo (/contattaci)',
    }),
  ],
  preview: {
    select: { platform: 'platform', label: 'label', url: 'url' },
    prepare({ platform, label, url }) {
      const names: Record<string, string> = {
        facebook: 'Facebook',
        instagram: 'Instagram',
        linkedin: 'LinkedIn',
        youtube: 'YouTube',
        whatsapp: 'WhatsApp',
        custom: label || 'Custom',
      }
      return { title: names[platform] || platform, subtitle: url }
    },
  },
})
