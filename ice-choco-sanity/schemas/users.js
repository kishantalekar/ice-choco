import {defineType} from 'sanity'
export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
  ],
})
