import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'iceCream',
  title: 'Ice Cream',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of the ice cream',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image of the ice cream',
      type: 'image',
    }),
    defineField({
      name: 'price',
      title: 'Price of the ice cream in rs',
      type: 'number',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1).max(5).required(),
    }),
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{type: 'brand'}],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{type: 'category'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
