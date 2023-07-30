import {defineConfig, isDev} from 'sanity'

import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'ice-choco-sanity',

  projectId: 'zetdffzm',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
