export interface HomepageData {
  _id: string
  title: string
  heroSection: {
    mainHeadline: string
    subheadline: string
    primaryCtaText: string
    primaryCtaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
    backgroundImage?: unknown
  }
  valueProposition: {
    headline: string
    description: unknown[]
    valueItems: {
      title: string
      description: string
      icon: string
    }[]
  }
  approachSection: {
    headline: string
    description: unknown[]
    processSteps: {
      step: string
      title: string
      description: string
    }[]
  }
  impactSection: {
    headline: string
    impactItems: {
      title: string
      description: string
      metric: string
    }[]
  }
  ctaSection: {
    headline: string
    description: string
    primaryCtaText: string
    primaryCtaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
    ogImage?: unknown
  }
}
