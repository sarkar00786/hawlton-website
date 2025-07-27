import { defineType, defineField } from 'sanity'

// Solution Schema for Our Solutions page
export default defineType({
  name: 'solution',
  title: '💡 Solutions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Solution Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide React icon name (e.g., "ShoppingCart", "Megaphone", "Truck")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key benefits for this solution'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Solution',
      type: 'boolean',
      description: 'Show this solution prominently'
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
      title: 'title',
      subtitle: 'icon'
    }
  }
})
