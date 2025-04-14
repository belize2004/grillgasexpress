import { defineField, defineType } from "sanity";
export const profile = defineType({
    name: 'profileCard',
    title: 'Profile',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Full Name',
        type: 'string',
        validation: Rule => Rule.required().error("Name is mandatory")
      }),
      {
        name: 'role',
        title: 'Role / Designation',
        type: 'string',
        validation: Rule => Rule.assetRequired().error('Designation is required')
      },
      {
        name: 'image',
        title: 'Profile Image',
        type: 'image',
        options: {
          hotspot: true, // Enables focal point cropping
        },
        validation: Rule => Rule.assetRequired().error('Image is required')
      },
      {
        name: 'externalLink',
        title: 'External Link (optional)',
        type: 'url',
        description: 'Used for the top-right arrow icon link',
      }
    ]
  }
);