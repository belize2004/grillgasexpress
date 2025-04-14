// sanity/schemas/cartItem.ts
import { defineType, defineField } from 'sanity';

export const cartItem = defineType({
  name: 'cartItem',
  title: 'Cart Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string',
      validation: Rule => Rule.required().error("Name is mandatory") }),
    defineField({ name: 'price', title: 'Price', type: 'number',
      validation: Rule => Rule.required().error("Price is mandatory")
     }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true },
      validation: Rule => Rule.required().error("Image is mandatory")
    }),
    defineField({ name: 'quantity', title: 'Quantity', type: 'number', initialValue: 1 }),
    defineField({ name: 'note', title: 'Note', type: 'string' }),
  ],
});
