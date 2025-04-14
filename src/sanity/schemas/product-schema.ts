import { defineField, defineType } from "sanity";

export const product = defineType ({
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
     defineField({
        name: 'name',
        type: 'string',
        title: 'Name',
        validation: Rule => Rule.required().error("Name is mandatory")
      }),
    //   {
    //     name: 'description',
    //     type: 'text',
    //     title: 'Description'
    //   },
      {
        name: 'price',
        type: 'number',
        title: 'Price',
        validation: Rule => Rule.assetRequired().error('Price is required')
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true
        },
        validation: Rule => Rule.assetRequired().error('Image is required')
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options:{source:'name'}
      }
    ]
  });