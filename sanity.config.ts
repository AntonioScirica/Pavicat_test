'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { projectId, dataset } from './src/sanity/config'
import { schemaTypes, singletonTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/studio/structure'
import { resolve } from './src/sanity/studio/resolve'
import { DeleteDocumentAction } from './src/sanity/studio/actions/DeleteAction'

export default defineConfig({
  name: 'pavicat',
  title: 'Pavicat CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-enable',
        },
      },
      resolve,
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : [...input, DeleteDocumentAction],
  },
})
