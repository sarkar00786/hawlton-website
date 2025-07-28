/**
 * Centralized Element ID Configuration
 * This file contains all element IDs used across the website for easy management and consistency
 */

export const ELEMENT_IDS = {
  // Header Elements
  HEADER: {
    LOGO: 'logo-main',
    NAV_HOME: 'nav-home',
    NAV_ABOUT: 'nav-about',
    NAV_SOLUTIONS: 'nav-solutions',
    NAV_PARTNER: 'nav-partner',
    NAV_INVEST: 'nav-invest',
    NAV_CONTACT: 'nav-contact',
    CTA_PARTNER: 'cta-partner-header',
    CTA_INVEST: 'cta-invest-header',
    CTA_GET_STARTED: 'cta-get-started-header',
    LANGUAGE_SWITCHER: 'language-switcher',
    MOBILE_MENU_TOGGLE: 'mobile-menu-toggle'
  },

  // Navigation Dropdown Items
  NAV_DROPDOWN: {
    // About Submenu
    ABOUT_STORY: 'nav-about-story',
    ABOUT_TEAM: 'nav-about-team',
    ABOUT_VISION: 'nav-about-vision',
    ABOUT_VALUES: 'nav-about-values',
    
    // Solutions Submenu
    SOLUTIONS_SERVICES: 'nav-solutions-services',
    SOLUTIONS_DIGITAL: 'nav-solutions-digital',
    SOLUTIONS_PARTNERSHIPS: 'nav-solutions-partnerships',
    SOLUTIONS_INVESTMENT: 'nav-solutions-investment',
    SOLUTIONS_SUCCESS: 'nav-solutions-success',
    
    // Partner Submenu
    PARTNER_BENEFITS: 'nav-partner-benefits',
    PARTNER_TYPES: 'nav-partner-types',
    PARTNER_PORTAL: 'nav-partner-portal',
    PARTNER_RESOURCES: 'nav-partner-resources',
    PARTNER_TESTIMONIALS: 'nav-partner-testimonials',
    PARTNER_APPLY: 'nav-partner-apply',
    
    // Invest Submenu
    INVEST_BENEFITS: 'nav-invest-benefits',
    INVEST_PORTFOLIO: 'nav-invest-portfolio',
    INVEST_OPPORTUNITIES: 'nav-invest-opportunities',
    INVEST_PORTAL: 'nav-invest-portal',
    INVEST_DOCS: 'nav-invest-docs',
    INVEST_START: 'nav-invest-start',
    
    // Contact Submenu
    CONTACT_FORM: 'nav-contact-form',
    CONTACT_INFO: 'nav-contact-info',
    CONTACT_CAREERS: 'nav-contact-careers'
  },

  // Homepage Elements
  HOMEPAGE: {
    // Hero Section
    HERO_SECTION: 'hero-section',
    HERO_TITLE: 'hero-title',
    HERO_SUBTITLE: 'hero-subtitle',
    HERO_PARTNER_BTN: 'hero-partner-btn',
    HERO_INVEST_BTN: 'hero-invest-btn',
    
    // Value Proposition Section
    VALUE_SECTION: 'value-proposition',
    VALUE_TITLE: 'value-title',
    VALUE_SUBTITLE: 'value-subtitle',
    VALUE_GROWTH_CARD: 'value-growth-card',
    VALUE_GROWTH_TITLE: 'value-growth-title',
    VALUE_PARTNERSHIP_CARD: 'value-partnership-card',
    VALUE_PARTNERSHIP_TITLE: 'value-partnership-title',
    VALUE_SECURITY_CARD: 'value-security-card',
    VALUE_SECURITY_TITLE: 'value-security-title',
    VALUE_IMPACT_CARD: 'value-impact-card',
    VALUE_IMPACT_TITLE: 'value-impact-title',
    
    // Approach Section
    APPROACH_SECTION: 'approach',
    APPROACH_TITLE: 'approach-title',
    APPROACH_SUBTITLE: 'approach-subtitle',
    APPROACH_STEP1: 'approach-step1',
    APPROACH_STEP2: 'approach-step2',
    APPROACH_STEP3: 'approach-step3'
  },

  // About Page Elements
  ABOUT: {
    HERO_SECTION: 'about-hero-section',
    STORY_TITLE: 'about-story-title',
    STORY_CONTENT: 'about-story-content',
    TEAM_SECTION: 'team-section',
    TEAM_TITLE: 'about-team-title',
    TEAM_GRID: 'team-grid',
    VISION_SECTION: 'vision-mission-section',
    VISION_TITLE: 'about-vision-title',
    VISION_CONTENT: 'about-vision-content',
    VALUES_SECTION: 'philosophy-section',
    VALUES_TITLE: 'about-values-title',
    VALUES_GRID: 'values-grid'
  },

  // Solutions Page Elements
  SOLUTIONS: {
    HERO_SECTION: 'solutions-hero-section',
    HERO_TITLE: 'solutions-hero-title',
    HERO_CONTENT: 'solutions-hero-content',
    DIGITAL_SECTION: 'digital-transformation-section',
    DIGITAL_TITLE: 'solutions-digital-title',
    PARTNERSHIPS_SECTION: 'digital-partnerships-section',
    PARTNERSHIPS_TITLE: 'solutions-partnerships-title',
    INVESTMENT_SECTION: 'investment-solutions-section',
    INVESTMENT_TITLE: 'solutions-investment-title',
    SUCCESS_SECTION: 'success-stories-section',
    SUCCESS_TITLE: 'solutions-success-title',
    IMPACT_SECTION: 'impact-section',
    CTA_SECTION: 'cta-section'
  },

  // Partner Page Elements
  PARTNER: {
    HERO_SECTION: 'partner-hero-section',
    BENEFITS_SECTION: 'benefits-section',
    BENEFITS_TITLE: 'partner-benefits-title',
    TYPES_SECTION: 'partnership-types-section',
    TYPES_TITLE: 'partner-types-title',
    PORTAL_SECTION: 'project-portal-section',
    RESOURCES_SECTION: 'partner-resources-section',
    PROCESS_SECTION: 'process-section',
    TESTIMONIALS_SECTION: 'testimonials-section',
    APPLICATION_FORM: 'partner-form',
    APPLY_BTN: 'partner-apply-btn'
  },

  // Invest Page Elements
  INVEST: {
    HERO_SECTION: 'invest-hero-section',
    BENEFITS_SECTION: 'benefits-section',
    BENEFITS_TITLE: 'invest-benefits-title',
    PORTFOLIO_SECTION: 'investment-portfolio-section',
    PORTFOLIO_TITLE: 'invest-portfolio-title',
    OPPORTUNITIES_SECTION: 'opportunities-section',
    OPPORTUNITIES_TITLE: 'invest-opportunities-title',
    RELATIONS_SECTION: 'investor-relations-section',
    DOCUMENTATION_SECTION: 'investment-documentation-section',
    TESTIMONIALS_SECTION: 'testimonials-section',
    INVESTMENT_FORM: 'investment-form',
    START_BTN: 'invest-start-btn'
  },

  // Investor Portal Elements
  INVESTOR_PORTAL: {
    PORTAL_TITLE: 'portal-title',
    DASHBOARD_TITLE: 'dashboard-title',
    STATS_GRID: 'stats-grid',
    STAT_TOTAL_INVESTMENT: 'stat-total-investment',
    STAT_PORTFOLIO_VALUE: 'stat-portfolio-value',
    STAT_ACTIVE_PROJECTS: 'stat-active-projects',
    STAT_ROI: 'stat-roi',
    RECENT_INVESTMENTS_SECTION: 'recent-investments-section',
    RECENT_INVESTMENTS_TITLE: 'recent-investments-title',
    QUICK_ACTIONS_SECTION: 'quick-actions-section',
    QUICK_ACTIONS_TITLE: 'quick-actions-title',
    BACK_TO_HAWLTON_BTN: 'back-to-hawlton-btn'
  },

  // Partner Portal Elements
  PARTNER_PORTAL: {
    PORTAL_TITLE: 'partner-portal-title',
    DASHBOARD_TITLE: 'partner-dashboard-title',
    BACK_BTN: 'partner-back-btn'
  },

  // Contact Page Elements
  CONTACT: {
    HERO_SECTION: 'contact-hero-section',
    TITLE: 'contact-title',
    FORM_SECTION: 'contact-form-section',
    FORM_TITLE: 'contact-form-title',
    FORM: 'contact-form',
    SUBMIT_BTN: 'contact-submit-btn',
    INFO_SECTION: 'contact-info',
    FAQ_SECTION: 'faq-section'
  },

  // Careers Page Elements
  CAREERS: {
    HERO_SECTION: 'careers-hero-section',
    TITLE: 'careers-title',
    POSITIONS_SECTION: 'open-positions',
    POSITIONS_TITLE: 'careers-positions-title',
    CULTURE_SECTION: 'company-culture',
    PROCESS_SECTION: 'hiring-process',
    APPLY_BTN: 'careers-apply-btn'
  },

  // Common UI Elements
  COMMON: {
    LOADING_SPINNER: 'loading-spinner',
    ERROR_MESSAGE: 'error-message',
    SUCCESS_MESSAGE: 'success-message',
    MODAL_OVERLAY: 'modal-overlay',
    MODAL_CONTENT: 'modal-content',
    CLOSE_BTN: 'close-btn',
    BACK_TO_TOP: 'back-to-top'
  },

  // Footer Elements
  FOOTER: {
    MAIN: 'footer-main',
    LOGO: 'footer-logo',
    QUICK_LINKS: 'footer-quick-links',
    SOCIAL_LINKS: 'footer-social-links',
    COPYRIGHT: 'footer-copyright',
    NEWSLETTER: 'footer-newsletter'
  }
} as const

// Helper function to get element ID with type safety
export const getElementId = (category: keyof typeof ELEMENT_IDS, key: string): string => {
  const categoryIds = ELEMENT_IDS[category]
  if (categoryIds && typeof categoryIds === 'object' && key in categoryIds) {
    return (categoryIds as any)[key]
  }
  console.warn(`Element ID not found: ${category}.${key}`)
  return `${category.toLowerCase()}-${key.toLowerCase().replace(/_/g, '-')}`
}

// Export individual categories for easier imports
export const HeaderIds = ELEMENT_IDS.HEADER
export const NavDropdownIds = ELEMENT_IDS.NAV_DROPDOWN
export const HomepageIds = ELEMENT_IDS.HOMEPAGE
export const AboutIds = ELEMENT_IDS.ABOUT
export const SolutionsIds = ELEMENT_IDS.SOLUTIONS
export const PartnerIds = ELEMENT_IDS.PARTNER
export const InvestIds = ELEMENT_IDS.INVEST
export const InvestorPortalIds = ELEMENT_IDS.INVESTOR_PORTAL
export const PartnerPortalIds = ELEMENT_IDS.PARTNER_PORTAL
export const ContactIds = ELEMENT_IDS.CONTACT
export const CareersIds = ELEMENT_IDS.CAREERS
export const CommonIds = ELEMENT_IDS.COMMON
export const FooterIds = ELEMENT_IDS.FOOTER
