import { defineType, defineField } from 'sanity'

// Testimonial Schema for future testimonials
export default defineType({
  name: 'testimonial',
  title: '💬 Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string'
    }),
    defineField({
      name: 'title',
      title: 'Author Title/Position',
      type: 'string'
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
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
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5)
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Partnership', value: 'partnership' },
          { title: 'Investment', value: 'investment' },
          { title: 'General', value: 'general' }
        ]
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show this testimonial prominently'
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
      title: 'author',
      subtitle: 'company',
      media: 'image'
    }
  }
})
