// sanity/schemas/cartItem.ts
import { defineType, defineField } from 'sanity';

export const cartItem = defineType({
  name: 'cartItem',
  title: 'Cart Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string' }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'quantity', title: 'Quantity', type: 'number', initialValue: 1 }),
    defineField({ name: 'note', title: 'Note', type: 'string' }),
  ],
});
