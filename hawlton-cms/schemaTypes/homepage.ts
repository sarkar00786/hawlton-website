import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: '🏠 Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title for the homepage'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainHeadline',
          title: 'Main Headline',
          type: 'string'
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline', 
          type: 'string'
        }),
        defineField({
          name: 'primaryCtaText',
          title: 'Primary CTA Text',
          type: 'string'
        }),
        defineField({
          name: 'primaryCtaLink',
          title: 'Primary CTA Link',
          type: 'string'
        }),
        defineField({
          name: 'secondaryCtaText',
          title: 'Secondary CTA Text',
          type: 'string'
        }),
        defineField({
          name: 'secondaryCtaLink',
          title: 'Secondary CTA Link',
          type: 'string'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ]
    }),
    defineField({
      name: 'valueProposition',
      title: 'Value Proposition Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Section Headline',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{ type: 'block' }]
        }),
        defineField({
          name: 'valueItems',
          title: 'Value Items',
          type: 'array',
          description: '🎯 Drag to reorder these value proposition items',
          of: [
            defineField({
              name: 'valueItem',
              title: 'Value Item',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Lucide icon name (e.g., TrendingUp, Users, Shield, Target)',
                  validation: (Rule) => Rule.required()
                })
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  media: 'icon'
                },
                prepare(selection) {
                  const { title, subtitle } = selection
                  return {
                    title,
                    subtitle: subtitle?.substring(0, 60) + '...',
                    media: () => '🎯'
                  }
                }
              }
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'approachSection',
      title: 'Our Approach Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Section Headline',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{ type: 'block' }]
        }),
        defineField({
          name: 'processSteps',
          title: 'Process Steps',
          type: 'array',
          of: [
            defineField({
              name: 'processStep',
              title: 'Process Step',
              type: 'object',
              fields: [
                defineField({
                  name: 'step',
                  title: 'Step Number',
                  type: 'string'
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string'
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text'
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'impactSection',
      title: 'Our Impact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Section Headline',
          type: 'string'
        }),
        defineField({
          name: 'impactItems',
          title: 'Impact Items',
          type: 'array',
          of: [
            defineField({
              name: 'impactItem',
              title: 'Impact Item',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string'
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text'
                }),
                defineField({
                  name: 'metric',
                  title: 'Metric Label',
                  type: 'string'
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'ctaSection',
      title: 'Call-to-Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Section Headline',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
        }),
        defineField({
          name: 'primaryCtaText',
          title: 'Primary CTA Text',
          type: 'string'
        }),
        defineField({
          name: 'primaryCtaLink',
          title: 'Primary CTA Link',
          type: 'string'
        }),
        defineField({
          name: 'secondaryCtaText',
          title: 'Secondary CTA Text',
          type: 'string'
        }),
        defineField({
          name: 'secondaryCtaLink',
          title: 'Secondary CTA Link',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string'
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text'
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'string'
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroSection.mainHeadline'
    }
  }
})
