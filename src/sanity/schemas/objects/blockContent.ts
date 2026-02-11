import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenuto Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normale', value: 'normal' },
        { title: 'Titolo 2', value: 'h2' },
        { title: 'Titolo 3', value: 'h3' },
        { title: 'Titolo 4', value: 'h4' },
        { title: 'Citazione', value: 'blockquote' },
      ],
      lists: [
        { title: 'Elenco puntato', value: 'bullet' },
        { title: 'Elenco numerato', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Grassetto', value: 'strong' },
          { title: 'Corsivo', value: 'em' },
          { title: 'Sottolineato', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              {
                name: 'blank',
                title: 'Apri in nuova finestra',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
})
