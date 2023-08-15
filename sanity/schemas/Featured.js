import {defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured category name',
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'iceCream',
      type: 'array',
      title: 'Ice Cream',
      of: [{type: 'reference', to: [{type: 'iceCream'}]}],
    },
  ],
})
