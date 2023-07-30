import {defineType} from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image of the brand',
      type: 'image',
    },
    {
      name: 'rating',
      title: 'Enter a rating from (1-5 stars)',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(5).error('enter a value between 1 and 5'),
    },

    // Add more fields specific to the brand (e.g., logo, description, etc.)
  ],
})
