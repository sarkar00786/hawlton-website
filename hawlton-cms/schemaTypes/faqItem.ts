import { defineType, defineField } from 'sanity'

// FAQ Schema for frequently asked questions
export default defineType({
  name: 'faqItem',
  title: '❓ FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Partnership', value: 'partnership' },
          { title: 'Investment', value: 'investment' },
          { title: 'General', value: 'general' },
          { title: 'Technical', value: 'technical' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured FAQ',
      type: 'boolean',
      description: 'Show this FAQ prominently'
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
      title: 'question',
      subtitle: 'category'
    }
  }
})
