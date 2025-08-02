/**
 * Utility for smooth scrolling to sections on the page
 */

export const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Comprehensive section mapping for all pages
export const PAGE_SECTIONS = {
  // Homepage sections
  '/': {
    'overview': 'hero-section',
    'about': 'value-proposition',
    'solutions': 'approach',
    'approach': 'approach',
    'values': 'value-proposition'
  },
  
  // About page sections - matching actual content
  '/about': {
    'overview': 'hero-section', // Company story section
    'team': 'team-section', // The Team Section
    'vision': 'vision-mission-section', // Vision & Mission Section
    'values': 'philosophy-section' // Our Philosophy Section
  },
  
  // Solutions page sections - matching actual content
  '/solutions': {
    'services': 'hero-section', // Main solutions intro
    'digital-transformation': 'digital-transformation-section', // Digital Transformation Section
    'partnerships': 'digital-partnerships-section', // Digital Growth Partnerships
    'success-stories': 'success-stories-section', // Success Stories Section
    'results': 'impact-section', // Our Impact Section
    'process': 'cta-section' // CTA Section
  },
  
  
  // Contact page sections - matching actual content
  '/contact': {
    'form': 'contact-form', // Contact Form Section
    'info': 'contact-info', // Contact Information
    'faq': 'faq-section' // FAQ Section
  },
  
  // Careers page sections - matching actual content
  '/careers': {
    'openings': 'open-positions', // Open Positions Section
    'culture': 'company-culture', // Why Work With Us Section
    'process': 'hiring-process', // Application Process Section
    'benefits': 'company-culture' // Benefits are part of company culture section
  }
}

// Navigation href to section mapping
export const NAVIGATION_MAPPING = {
  // About dropdown mappings - matching new structure
  '/about#overview': 'overview',
  '/about#team': 'team',
  '/about#vision': 'vision', 
  '/about#values': 'values',
  
  // Solutions dropdown mappings - matching new structure
  '/solutions#services': 'services',
  '/solutions#digital-transformation': 'digital-transformation',
  '/solutions#partnerships': 'partnerships',
  '/solutions#success-stories': 'success-stories',
  '/solutions#results': 'results',
  '/solutions#process': 'process',
  
  
  // Contact dropdown mappings - matching new structure
  '/contact#form': 'form',
  '/contact#info': 'info',
  
  // Careers dropdown mappings
  '/careers#openings': 'openings',
  '/careers#culture': 'culture',
  '/careers#process': 'process'
}

/**
 * Handle navigation with section scrolling
 * @param href - The target href
 * @param currentPath - Current pathname
 * @param router - Next.js router instance
 */
export const handleNavigation = (
  href: string, 
  currentPath: string, 
  router: any,
  onComplete?: () => void
) => {
  const targetPath = href.split('#')[0] // Remove any existing hash
  const sectionKey = NAVIGATION_MAPPING[href as keyof typeof NAVIGATION_MAPPING]
  
  // Handle direct page routes (like portals) that don't need section scrolling
  const isDirectPageRoute = ['/partner-portal', '/dashboard'].includes(targetPath)
  
  if (isDirectPageRoute) {
    router.push(targetPath)
    onComplete?.()
    return true
  }
  
  // If we're already on the target page, just scroll to section
  if (currentPath === targetPath && sectionKey) {
    const pageSections = PAGE_SECTIONS[targetPath as keyof typeof PAGE_SECTIONS]
    if (pageSections && sectionKey in pageSections) {
      const sectionId = pageSections[sectionKey as keyof typeof pageSections]
      setTimeout(() => {
        scrollToSection(sectionId)
        onComplete?.()
      }, 100)
      return true
    }
  }
  
  // If we need to navigate to a different page, go there first then scroll
  if (currentPath !== targetPath) {
    router.push(targetPath).then(() => {
      // Wait for page to load, then scroll to section
      if (sectionKey) {
        const pageSections = PAGE_SECTIONS[targetPath as keyof typeof PAGE_SECTIONS]
        if (pageSections && sectionKey in pageSections) {
          const sectionId = pageSections[sectionKey as keyof typeof pageSections]
          setTimeout(() => {
            scrollToSection(sectionId)
            onComplete?.()
          }, 300) // Slightly longer delay for page navigation
        }
      }
      onComplete?.()
    })
    return true
  }
  
  // Default navigation
  router.push(href)
  onComplete?.()
  return true
}

/**
 * Get section ID for a given page and section key
 */
export const getSectionId = (pathname: string, sectionKey: string): string | null => {
  const pageSections = PAGE_SECTIONS[pathname as keyof typeof PAGE_SECTIONS]
  if (pageSections && sectionKey in pageSections) {
    return pageSections[sectionKey as keyof typeof pageSections]
  }
  return null
}
