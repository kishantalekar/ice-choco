import {defineType} from 'sanity'

export default defineType({
  name: 'carousel',
  title: 'Carousel',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image ',
      type: 'image',
    },
    {
      name: 'description',
      title: 'carousel description',
      type: 'string',
    },

    // Add more fields specific to the brand (e.g., logo, description, etc.)
  ],
})
