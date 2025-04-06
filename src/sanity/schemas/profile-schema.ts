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
      }),
      {
        name: 'role',
        title: 'Role / Designation',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Profile Image',
        type: 'image',
        options: {
          hotspot: true, // Enables focal point cropping
        },
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