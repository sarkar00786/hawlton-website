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
  
  // About page sections
  '/about': {
    'overview': 'about-overview',
    'team': 'about-team', 
    'vision': 'about-vision',
    'awards': 'about-awards',
    'mission': 'about-mission',
    'history': 'about-history'
  },
  
  // Solutions page sections
  '/solutions': {
    'digital-transformation': 'solutions-digital',
    'partnerships': 'solutions-partnerships', 
    'investment': 'solutions-investment',
    'success-stories': 'solutions-success',
    'services': 'solutions-services',
    'process': 'solutions-process'
  },
  
  // Partner page sections
  '/partner': {
    'types': 'partner-types',
    'application': 'partner-application',
    'process': 'partner-process',
    'benefits': 'partner-benefits',
    'requirements': 'partner-requirements',
    'testimonials': 'partner-testimonials'
  },
  
  // Invest page sections  
  '/invest': {
    'opportunities': 'invest-opportunities',
    'portfolio': 'invest-portfolio',
    'relations': 'invest-relations',
    'documentation': 'invest-documentation',
    'process': 'invest-process',
    'returns': 'invest-returns'
  },
  
  // Contact page sections
  '/contact': {
    'form': 'contact-form',
    'locations': 'contact-locations', 
    'info': 'contact-info',
    'map': 'contact-map'
  },
  
  // Careers page sections
  '/careers': {
    'openings': 'careers-openings',
    'culture': 'careers-culture',
    'benefits': 'careers-benefits',
    'process': 'careers-process',
    'apply': 'careers-apply'
  }
}

// Navigation href to section mapping
export const NAVIGATION_MAPPING = {
  // About dropdown mappings
  '/about': 'overview',
  '/about/team': 'team',
  '/about/vision': 'vision', 
  '/about/awards': 'awards',
  
  // Solutions dropdown mappings
  '/solutions': 'services',
  '/solutions/digital-transformation': 'digital-transformation',
  '/solutions/partnerships': 'partnerships',
  '/solutions/investment': 'investment',
  '/solutions/success-stories': 'success-stories',
  
  // Partner dropdown mappings
  '/partner': 'benefits',
  '/partner/types': 'types', 
  '/partner/apply': 'application',
  '/partner/portal': 'process',
  '/partner/resources': 'requirements',
  
  // Invest dropdown mappings
  '/invest': 'opportunities',
  '/invest/opportunities': 'opportunities',
  '/invest/portfolio': 'portfolio',
  '/invest/relations': 'relations', 
  '/invest/docs': 'documentation',
  
  // Contact dropdown mappings
  '/contact': 'form',
  '/contact/locations': 'locations',
  '/careers': 'openings'
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
  
  // If we're already on the target page, just scroll to section
  if (currentPath === targetPath && sectionKey) {
    const pageSections = PAGE_SECTIONS[targetPath as keyof typeof PAGE_SECTIONS]
    if (pageSections && pageSections[sectionKey]) {
      setTimeout(() => {
        scrollToSection(pageSections[sectionKey])
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
        if (pageSections && pageSections[sectionKey]) {
          setTimeout(() => {
            scrollToSection(pageSections[sectionKey])
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
  return pageSections ? pageSections[sectionKey] || null : null
}
