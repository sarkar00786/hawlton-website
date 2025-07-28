# Hawlton Website Element Reference Guide

This document provides a complete reference for identifying and modifying any element on the Hawlton website. Each element is identified by its visible text, location, and unique identifier for easy modification.

## 🚀 NEW: Centralized Element ID System

We now use a centralized element ID configuration system located in `src/config/elementIds.ts`. This ensures consistency across the entire website and makes element identification much easier.

## How to Use This Guide

When you want to modify something on the website, you can reference elements by:
1. **Visible Text** - What you see on the screen
2. **Location** - Which page and section it's in
3. **Element ID** - Unique identifier for precise targeting (now centralized)
4. **Description** - What the element does
5. **Configuration Path** - Direct reference to the ID in the centralized config

## 🏠 HOMEPAGE ELEMENTS

### Header/Navigation Elements
| Visible Text | Element ID | Location | Description | File Location |
|-------------|------------|----------|-------------|---------------|
| "Hawlton" | `logo-main` | Header (all pages) | Main website logo | `src/components/Header.tsx` |
| "Home" | `nav-home` | Header navigation | Home page link | `src/components/EnhancedNavigation.tsx` |
| "About Us" | `nav-about` | Header navigation | About dropdown menu | `src/components/EnhancedNavigation.tsx` |
| "Solutions" | `nav-solutions` | Header navigation | Solutions dropdown menu | `src/components/EnhancedNavigation.tsx` |
| "Partner" | `nav-partner` | Header navigation | Partner dropdown menu | `src/components/EnhancedNavigation.tsx` |
| "Invest" | `nav-invest` | Header navigation | Invest dropdown menu | `src/components/EnhancedNavigation.tsx` |
| "Contact" | `nav-contact` | Header navigation | Contact dropdown menu | `src/components/EnhancedNavigation.tsx` |
| "Partner" | `cta-partner-header` | Header right side | Partner CTA button | `src/components/Header.tsx` |
| "Invest" | `cta-invest-header` | Header right side | Invest CTA button | `src/components/Header.tsx` |
| "Get Started" | `cta-get-started-header` | Header right side | Get Started CTA button | `src/components/Header.tsx` |

### About Dropdown Menu Items
| Visible Text | Element ID | Description | Target Link |
|-------------|------------|-------------|-------------|
| "Our Story" | `nav-about-story` | Company background and mission | `/about#overview` |
| "Leadership Team" | `nav-about-team` | Meet the team section | `/about#team` |
| "Vision & Mission" | `nav-about-vision` | Company vision and mission | `/about#vision` |
| "Our Values" | `nav-about-values` | Company values and principles | `/about#values` |

### Solutions Dropdown Menu Items
| Visible Text | Element ID | Description | Target Link |
|-------------|------------|-------------|-------------|
| "Our Services" | `nav-solutions-services` | Overview of services | `/solutions#services` |
| "Digital Transformation" | `nav-solutions-digital` | Digital transformation services | `/solutions#digital-transformation` |
| "Strategic Partnerships" | `nav-solutions-partnerships` | Partnership programs | `/solutions#partnerships` |
| "Investment Solutions" | `nav-solutions-investment` | Investment services | `/solutions#investment` |
| "Success Stories" | `nav-solutions-success` | Client case studies | `/solutions#success-stories` |

### Partner Dropdown Menu Items
| Visible Text | Element ID | Description | Target Link |
|-------------|------------|-------------|-------------|
| "Partnership Benefits" | `nav-partner-benefits` | Benefits of partnering | `/partner#benefits` |
| "Partnership Types" | `nav-partner-types` | Different partnership models | `/partner#types` |
| "Project Portal" | `nav-partner-portal` | Access partner portal | `/partner-portal` |
| "Partner Resources" | `nav-partner-resources` | Tools and resources | `/partner#resources` |
| "Success Stories" | `nav-partner-testimonials` | Partner testimonials | `/partner#testimonials` |
| "Apply Now" | `nav-partner-apply` | Partnership application | `/partner#application` |

### Invest Dropdown Menu Items
| Visible Text | Element ID | Description | Target Link |
|-------------|------------|-------------|-------------|
| "Investment Benefits" | `nav-invest-benefits` | Investment advantages | `/invest#benefits` |
| "Investment Portfolio" | `nav-invest-portfolio` | Current portfolio | `/invest#portfolio` |
| "Investment Opportunities" | `nav-invest-opportunities` | Available investments | `/invest#opportunities` |
| "Investor Portal" | `nav-invest-portal` | Access investor dashboard | `/investor-portal` |
| "Documentation" | `nav-invest-docs` | Investment documents | `/invest#documentation` |
| "Get Started" | `nav-invest-start` | Begin investing | `/invest#investment-form` |

### Contact Dropdown Menu Items
| Visible Text | Element ID | Description | Target Link |
|-------------|------------|-------------|-------------|
| "Get In Touch" | `nav-contact-form` | Contact form | `/contact#form` |
| "Contact Info" | `nav-contact-info` | Contact details | `/contact#info` |
| "Careers" | `nav-contact-careers` | Job opportunities | `/careers#openings` |

### Homepage Hero Section
| Visible Text | Element ID | Location | Description | File Location |
|-------------|------------|----------|-------------|---------------|
| "Empowering Pakistan's Digital Future" | `hero-title` | Homepage hero | Main headline | `src/app/page.tsx` |
| "We transform ambitious Pakistani..." | `hero-subtitle` | Homepage hero | Hero description | `src/app/page.tsx` |
| "Start Your Digital Growth Journey" | `hero-partner-btn` | Homepage hero | Partner CTA button | `src/app/page.tsx` |
| "Explore Investment Opportunities" | `hero-invest-btn` | Homepage hero | Investment CTA button | `src/app/page.tsx` |

### Value Proposition Section
| Visible Text | Element ID | Location | Description |
|-------------|------------|----------|-------------|
| "Driving Digital Growth Through Strategic Partnerships" | `value-title` | Homepage value section | Section title |
| "Hawlton bridges the gap..." | `value-subtitle` | Homepage value section | Section description |
| "Digital Growth" | `value-growth-title` | Homepage value section | Growth pillar title |
| "Partnership" | `value-partnership-title` | Homepage value section | Partnership pillar title |
| "Security" | `value-security-title` | Homepage value section | Security pillar title |
| "Impact" | `value-impact-title` | Homepage value section | Impact pillar title |

## 📄 ABOUT PAGE ELEMENTS

### About Page Sections
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Our Story" | `about-story-title` | Hero section | Page title | `src/app/about/page.tsx` |
| "Our Team" | `about-team-title` | Team section | Team section title | `src/app/about/page.tsx` |
| "Vision & Mission" | `about-vision-title` | Vision section | Vision section title | `src/app/about/page.tsx` |
| "Our Values" | `about-values-title` | Values section | Values section title | `src/app/about/page.tsx` |

## 🎯 SOLUTIONS PAGE ELEMENTS

### Solutions Page Sections
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Our Solutions" | `solutions-hero-title` | Hero section | Page title | `src/app/solutions/page.tsx` |
| "Digital Transformation" | `solutions-digital-title` | Digital section | Digital transformation title | `src/app/solutions/page.tsx` |
| "Strategic Partnerships" | `solutions-partnerships-title` | Partnership section | Partnership section title | `src/app/solutions/page.tsx` |
| "Investment Solutions" | `solutions-investment-title` | Investment section | Investment section title | `src/app/solutions/page.tsx` |

## 🤝 PARTNER PAGE ELEMENTS

### Partner Page Sections
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Partnership Benefits" | `partner-benefits-title` | Benefits section | Benefits section title | `src/app/partner/page.tsx` |
| "Partnership Types" | `partner-types-title` | Types section | Partnership types title | `src/app/partner/page.tsx` |
| "Apply Now" | `partner-apply-btn` | Application section | Application button | `src/app/partner/page.tsx` |

## 💰 INVEST PAGE ELEMENTS

### Invest Page Sections
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Investment Benefits" | `invest-benefits-title` | Benefits section | Benefits section title | `src/app/invest/page.tsx` |
| "Investment Portfolio" | `invest-portfolio-title` | Portfolio section | Portfolio section title | `src/app/invest/page.tsx` |
| "Investment Opportunities" | `invest-opportunities-title` | Opportunities section | Opportunities section title | `src/app/invest/page.tsx` |
| "Get Started" | `invest-start-btn` | CTA section | Investment CTA button | `src/app/invest/page.tsx` |

## 🏢 INVESTOR PORTAL ELEMENTS

### Investor Portal Dashboard
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Investor Portal" | `portal-title` | Header | Portal page title | `src/app/investor-portal/page.tsx` |
| "Portfolio Dashboard" | `dashboard-title` | Main content | Dashboard title | `src/app/investor-portal/page.tsx` |
| "Total Investment" | `stat-total-investment` | Stats grid | Investment amount stat | `src/app/investor-portal/page.tsx` |
| "Portfolio Value" | `stat-portfolio-value` | Stats grid | Portfolio value stat | `src/app/investor-portal/page.tsx` |
| "Active Projects" | `stat-active-projects` | Stats grid | Active projects stat | `src/app/investor-portal/page.tsx` |
| "ROI" | `stat-roi` | Stats grid | ROI percentage stat | `src/app/investor-portal/page.tsx` |
| "Recent Investments" | `recent-investments-title` | Investments section | Recent investments title | `src/app/investor-portal/page.tsx` |
| "Quick Actions" | `quick-actions-title` | Actions section | Quick actions title | `src/app/investor-portal/page.tsx` |
| "Back to Hawlton" | `back-to-hawlton-btn` | Header | Return to main site button | `src/app/investor-portal/page.tsx` |

## 🤝 PARTNER PORTAL ELEMENTS

### Partner Portal Dashboard
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Partner Portal" | `partner-portal-title` | Header | Portal page title | `src/app/partner-portal/page.tsx` |
| "Project Dashboard" | `partner-dashboard-title` | Main content | Dashboard title | `src/app/partner-portal/page.tsx` |
| "Back to Hawlton" | `partner-back-btn` | Header | Return to main site button | `src/app/partner-portal/page.tsx` |

## 📞 CONTACT PAGE ELEMENTS

### Contact Page Sections
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Get In Touch" | `contact-title` | Hero section | Page title | `src/app/contact/page.tsx` |
| "Contact Form" | `contact-form-title` | Form section | Contact form title | `src/app/contact/page.tsx` |
| "Send Message" | `contact-submit-btn` | Form section | Form submit button | `src/app/contact/page.tsx` |

## 💼 CAREERS PAGE ELEMENTS

### Careers Page Sections
| Visible Text | Element ID | Section | Description | File Location |
|-------------|------------|---------|-------------|---------------|
| "Career Opportunities" | `careers-title` | Hero section | Page title | `src/app/careers/page.tsx` |
| "Open Positions" | `careers-positions-title` | Positions section | Open positions title | `src/app/careers/page.tsx` |
| "Apply Now" | `careers-apply-btn` | Position cards | Apply button | `src/app/careers/page.tsx` |

## 🎨 STYLING ELEMENTS

### Color Classes (for styling modifications)
| Color Name | CSS Class | Hex Code | Usage |
|------------|-----------|----------|-------|
| Primary Navy | `text-primary-navy` / `bg-primary-navy` | #0F172A | Main dark color |
| Primary Gold | `text-primary-gold` / `bg-primary-gold` | #F59E0B | Accent color |
| Primary White | `text-primary-white` / `bg-primary-white` | #FFFFFF | Text/background |
| Primary Silver | `text-primary-silver` / `bg-primary-silver` | #94A3B8 | Secondary text |

### Typography Classes
| Text Style | CSS Class | Usage |
|------------|-----------|-------|
| Main Heading | `text-4xl font-bold` | Page titles |
| Section Heading | `text-2xl font-semibold` | Section titles |
| Button Text | `font-medium` | Button labels |
| Body Text | `text-base` | Regular content |

## 🔧 HOW TO MODIFY ELEMENTS

### To Change Text Content:
1. Find the element using the "Visible Text" or "Element ID"
2. Go to the specified "File Location"
3. Search for the text or ID in the file
4. Modify the content between the quotes

### Example Commands for Modifications:

**To change the main hero title:**
```
"Change the homepage hero title 'Empowering Pakistan's Digital Future' to 'Building Pakistan's Digital Economy'"
```

**To modify a button:**
```
"Change the 'Get Started' button in the header to say 'Join Now'"
```

**To update navigation menu:**
```
"Change the 'About Us' menu item to 'About Hawlton'"
```

**To modify a section title:**
```
"Change the 'Investment Benefits' title on the invest page to 'Why Invest With Us'"
```

### Language Modifications:
All text content supports both English (EN) and Urdu (UR). Language strings are stored in:
`src/contexts/LanguageContext.tsx`

To modify language content, reference the translation key (e.g., `nav.about`, `home.hero.title`) in the LanguageContext file.

## 📂 QUICK FILE REFERENCE

### Most Important Files for Content Changes:
- **Navigation**: `src/components/EnhancedNavigation.tsx`
- **Header**: `src/components/Header.tsx`
- **Homepage**: `src/app/page.tsx`
- **About Page**: `src/app/about/page.tsx`
- **Solutions Page**: `src/app/solutions/page.tsx`
- **Partner Page**: `src/app/partner/page.tsx`
- **Invest Page**: `src/app/invest/page.tsx`
- **Contact Page**: `src/app/contact/page.tsx`
- **Careers Page**: `src/app/careers/page.tsx`
- **Investor Portal**: `src/app/investor-portal/page.tsx`
- **Partner Portal**: `src/app/partner-portal/page.tsx`
- **Language Translations**: `src/contexts/LanguageContext.tsx`

## 🚀 COMMON MODIFICATION PATTERNS

### Pattern 1: Changing Button Text
"Change the [CURRENT_TEXT] button on [PAGE_NAME] to say [NEW_TEXT]"

### Pattern 2: Updating Section Titles
"Change the [CURRENT_TITLE] section title on [PAGE_NAME] to [NEW_TITLE]"

### Pattern 3: Modifying Navigation
"Change the [MENU_ITEM] in the navigation to [NEW_TEXT]"

### Pattern 4: Updating Content
"Change the text [CURRENT_TEXT] on [PAGE_NAME] to [NEW_TEXT]"

### Pattern 5: Adding New Elements
"Add a new [ELEMENT_TYPE] with text [TEXT] on [PAGE_NAME] in the [SECTION_NAME] section"

---

**Last Updated**: January 2025
**Version**: 1.0

This reference guide will be updated whenever new elements are added or modified on the website.
