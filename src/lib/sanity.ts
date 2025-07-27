import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Direct configuration (can also use environment variables)
export const client = createClient({
  projectId: 'rk3mi8vx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for fresh data in development
})

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: unknown) {
  if (!builder) {
    console.warn('Sanity client not configured properly')
    return { url: () => '' }
  }
  return builder.image(source as Parameters<typeof builder.image>[0])
}

// Helper function to convert portable text to plain text for descriptions
export function toPlainText(blocks: unknown[] = []): string {
  return blocks
    .map((block: unknown) => {
      if (typeof block !== 'object' || block === null || !('_type' in block) || block._type !== 'block' || !('children' in block)) {
        return ''
      }
      const children = block.children as unknown[]
      return children.map((child: unknown) => {
        if (typeof child === 'object' && child !== null && 'text' in child) {
          return (child as { text: string }).text
        }
        return ''
      }).join('')
    })
    .join('\n\n')
}

// Queries for different content types
export const queries = {
  // Homepage content
  homepage: `*[_type == "homepage"][0] {
    _id,
    title,
    heroSection {
      mainHeadline,
      subheadline,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      backgroundImage
    },
    valueProposition {
      headline,
      description,
      valueItems[] {
        title,
        description,
        icon
      }
    },
    approachSection {
      headline,
      description,
      processSteps[] {
        step,
        title,
        description
      }
    },
    impactSection {
      headline,
      impactItems[] {
        title,
        description,
        metric
      }
    },
    ctaSection {
      headline,
      description,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage
    }
  }`,
  
  // Team members for About Us page
  teamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    title,
    alternativeName,
    bio,
    image,
    order
  }`,
  
  // Solutions for Our Solutions page
  solutions: `*[_type == "solution"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    benefits,
    order,
    featured
  }`,
  
  // FAQs by category
  faqsByCategory: `*[_type == "faqItem" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order,
    featured
  }`,
  
  // All FAQs
  allFaqs: `*[_type == "faqItem"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order,
    featured
  }`,
  
  // Pages by slug
  pageBySlug: `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    seoTitle,
    seoDescription,
    featured
  }`,
  
  // Featured pages for navigation
  featuredPages: `*[_type == "page" && featured == true] | order(title asc) {
    _id,
    title,
    slug
  }`,
  
  // Site settings
  siteSettings: `*[_type == "setting"][0] {
    _id,
    title,
    description,
    email,
    phone,
    address,
    socialMedia,
    logo,
    favicon
  }`,
  
  // Featured testimonials
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    author,
    company,
    title,
    quote,
    image,
    rating,
    category,
    order
  }`,
  
  // Testimonials by category
  testimonialsByCategory: `*[_type == "testimonial" && category == $category] | order(order asc) {
    _id,
    author,
    company,
    title,
    quote,
    image,
    rating,
    category,
    order
  }`
}
