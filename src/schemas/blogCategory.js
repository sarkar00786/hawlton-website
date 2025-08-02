import { defineType, defineField } from '@sanity/schema'

export default defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      options: {
        list: [
          { title: 'Gold', value: 'primary-gold' },
          { title: 'Navy', value: 'primary-navy' },
          { title: 'Charcoal', value: 'primary-charcoal' }
        ]
      }
    })
  ]
})

