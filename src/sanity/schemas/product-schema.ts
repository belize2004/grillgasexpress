import { defineField, defineType } from "sanity";

export const product = defineType ({
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
     defineField({
        name: 'name',
        type: 'string',
        title: 'Name'
      }),
    //   {
    //     name: 'description',
    //     type: 'text',
    //     title: 'Description'
    //   },
      {
        name: 'price',
        type: 'number',
        title: 'Price'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options:{source:'name '}
      }
    ]
  });