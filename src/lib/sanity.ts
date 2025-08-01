import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Direct configuration (can also use environment variables)
export const client = createClient({
  projectId: 'rk3mi8vx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for fresh data in development
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
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
  }`,
  
  // Blog posts queries
  blogPosts: `*[_type == "blogPost" && !draft] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      slug,
      color
    },
    author->{
      name,
      title,
      image
    },
    publishedAt,
    tags,
    featured,
    seo
  }`,
  
  // Featured blog posts
  featuredBlogPosts: `*[_type == "blogPost" && featured == true && !draft] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      slug,
      color
    },
    author->{
      name,
      title,
      image
    },
    publishedAt,
    tags
  }`,
  
  // Blog post by slug
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug && !draft][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      slug,
      color,
      description
    },
    author->{
      name,
      title,
      bio,
      image
    },
    publishedAt,
    content,
    tags,
    seo,
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug && !draft && category._ref == ^.category._ref] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt
    }
  }`,
  
  // Blog posts by category
  blogPostsByCategory: `*[_type == "blogPost" && category->slug.current == $categorySlug && !draft] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      slug,
      color
    },
    author->{
      name,
      title,
      image
    },
    publishedAt,
    tags
  }`,
  
  // Blog categories
  blogCategories: `*[_type == "blogCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "blogPost" && references(^._id) && !draft])
  }`,
  
  // Recent blog posts for homepage
  recentBlogPosts: `*[_type == "blogPost" && !draft] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      slug,
      color
    },
    publishedAt
  }`
}
