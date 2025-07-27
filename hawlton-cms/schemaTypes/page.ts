import { defineType, defineField } from 'sanity'

// Page Schema for static pages (About Us, Partner With Us, Invest With Us, Contact Us, Legal Pages)
export default defineType({
  name: 'page',
  title: '📄 Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ]
          }
        },
        {
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
        }
      ]
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines (leave empty to use page title)'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Description for search engines and social media',
      validation: (Rule) => Rule.max(160)
    }),
    defineField({
      name: 'featured',
      title: 'Show in Navigation',
      type: 'boolean',
      description: 'Show this page in the main navigation menu'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    }
  }
})
