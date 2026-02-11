import { defineField, defineType } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Pagina Servizi',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Header pagina',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titolo pagina', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Immagine', type: 'imageWithAlt' }),
      ],
    }),
    defineField({
      name: 'introText',
      title: 'Testo introduttivo',
      type: 'blockContent',
    }),
    defineField({
      name: 'ctaBanner',
      title: 'Banner CTA in fondo',
      type: 'ctaBlock',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pagina Servizi' }
    },
  },
})
