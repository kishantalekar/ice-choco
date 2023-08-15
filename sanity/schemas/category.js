import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'ice cream category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'image',
      type: 'image',
    }),
  ],
})
