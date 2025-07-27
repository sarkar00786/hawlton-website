import { defineType, defineField } from 'sanity'

// Team Member Schema for About Us page
export default defineType({
  name: 'teamMember',
  title: '👥 Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Position/Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'alternativeName',
      title: 'Alternative Name (Optional)',
      type: 'string',
      description: 'Also known as... (e.g., Sarkar Hussain for Jahangir Hussain)'
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Professional Headshot',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility.'
        }
      ]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image'
    }
  }
})
