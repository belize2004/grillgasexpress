import { defineField, defineType } from "sanity";
export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
      defineField({
        name: 'clientName',
        title: 'Client Name',
        type: 'string',
      }),
      {
        name: 'content',
        title: 'Testimonial Content',
        type: 'string'
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'string',
        description: 'e.g. "5/5" or "1/5"',
        options: {
          list: [
            { title: '1/5', value: '1/5 ★' },
            { title: '2/5', value: '2/5 ★★' },
            { title: '3/5', value: '3/5 ★★★' },
            { title: '4/5', value: '4/5 ★★★★' },
            { title: '5/5', value: '5/5 ★★★★★' }
          ]
        }
      },
      {
        name: 'image',
        title: 'Client Photo/Logo',
        type: 'image',
        options: {
          hotspot: true
        },
        fields: [
          {
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
            description: 'Important for accessibility'
          }
        ]
      }
    ],
  });