import {createSchema} from 'sanity'
import {SchemaType} from 'sanity'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // {
    //   name: 'user',
    //   title: 'User',
    //   type: 'document',
    //   fields: [
    //     // Define fields for the user data type, e.g., name, email, etc.
    //     // ...
    //   ],
    // },
    {
      name: 'iceCream',
      title: 'Ice Cream',
      type: 'document',
      fields: [
        // Define fields for the ice cream data type, e.g., name, price, etc.
        // ...
      ],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'document',
      fields: [
        {
          name: 'user',
          title: 'User',
          type: 'reference',
          to: [{type: 'user'}],
        },
        {
          name: 'dateAndTime',
          title: 'Date and Time',
          type: 'datetime',
        },
        {
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              {title: 'Pending', value: 'pending'},
              {title: 'Approved', value: 'approved'},
              {title: 'Delivered', value: 'delivered'},
            ],
            layout: 'radio',
          },
        },
        {
          name: 'iceCreams',
          title: 'Ordered Ice Creams',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'iceCream',
                  title: 'Ice Cream',
                  type: 'reference',
                  to: [{type: 'iceCream'}],
                },
                {
                  name: 'quantity',
                  title: 'Quantity',
                  type: 'number',
                },
              ],
            },
          ],
        },
        {
          name: 'totalPrice',
          title: 'Total Price',
          type: 'number',
        },
      ],
    },
  ]),
})
