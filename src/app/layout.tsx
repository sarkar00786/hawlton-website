import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GDPRCookieConsent from "@/components/GDPRCookieConsent";
import BackToTop from "@/components/ui/BackToTop";
import AccessibilityEnhancer from "@/components/ui/AccessibilityEnhancer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { ToastProvider } from "@/components/ui/Toast";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { LoadingProvider } from "@/components/ui/LoadingStates";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hawlton.com'),
  title: {
    default: "Hawlton - Pakistan's Premier Digital Transformation & Partnership Platform",
    template: "%s | Hawlton - Digital Growth Partners Pakistan"
  },
  description: "🚀 Empowering Pakistani businesses through strategic digital partnerships and innovative solutions. Transform your local business into a national digital powerhouse with proven growth strategies, measurable success, and expert guidance. Join 500+ successful Pakistani businesses scaling digitally.",
  keywords: [
    "Pakistan digital transformation",
    "strategic business partnerships Pakistan", 
    "digital growth opportunities",
    "e-commerce development Pakistan",
    "online business solutions Pakistan",
    "Pakistan startup ecosystem",
    "digital marketing Pakistan",
    "business scaling solutions",
    "digital economy partnerships",
    "technology consulting Pakistan",
    "digital transformation consultancy",
    "Pakistani business growth",
    "online marketplace Pakistan",
    "digital innovation Pakistan",
    "business development Pakistan",
    "SME digitization Pakistan",
    "digital strategy consulting",
    "Pakistan tech partnerships",
    "business automation Pakistan",
    "digital solutions provider Pakistan"
  ],
  authors: [{ name: "Hawlton", url: "https://hawlton.com" }],
  creator: "Hawlton Digital Transformation",
  publisher: "Hawlton Private Limited",
  applicationName: "Hawlton Platform",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hawlton.com",
    siteName: "Hawlton - Pakistan's Digital Transformation Leaders",
    title: "Hawlton - Empowering Pakistan's Digital Future 🇵🇰",
    description: "🚀 Pakistan's #1 Digital Transformation Platform | 500+ Successful Partnerships | Proven Growth Strategies | Transform Your Business Digitally | Strategic Partnerships & Innovation Solutions",
    images: [
      {
        url: "/images/backgrounds/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Hawlton - Pakistan's Premier Digital Transformation Platform - Empowering Businesses Through Strategic Partnerships",
        type: "image/jpeg",
      },
      {
        url: "/images/team/Jahangir-Hussain.jpg",
        width: 400,
        height: 400,
        alt: "Jahangir Hussain - Founder & Visionary Lead at Hawlton",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hawlton",
    creator: "@hawlton",
    title: "Hawlton - Pakistan's Digital Transformation Leaders 🇵🇰",
    description: "🚀 Empowering Pakistani businesses through strategic partnerships | 500+ Success Stories | Digital Growth Solutions | Transform Your Business Today",
    images: {
      url: "/images/backgrounds/home-hero.jpg",
      alt: "Hawlton - Digital Transformation Platform Pakistan",
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://hawlton.com",
    languages: {
      'en-US': process.env.NEXT_PUBLIC_SITE_URL || "https://hawlton.com",
      'en': process.env.NEXT_PUBLIC_SITE_URL || "https://hawlton.com",
    },
  },
  category: "Business Services",
  classification: "Digital Transformation and Business Partnership Platform",
  other: {
    "msapplication-TileColor": "#FFD700",
    "msapplication-TileImage": "/android-chrome-192x192.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Hawlton",
    "mobile-web-app-capable": "yes",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
  },
};

// Comprehensive Schema.org structured data for institutional credibility
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Corporation", "LocalBusiness", "FinancialService"],
  "@id": "https://hawlton.com/#organization",
  "name": "Hawlton",
  "alternateName": "Hawlton Digital Transformation",
  "legalName": "Hawlton Private Limited",
  "description": "Empowering Pakistan's Digital Future through Strategic Partnerships and Digital Innovation. Leading digital transformation company specializing in e-commerce, business development, and strategic partnership opportunities in Pakistan's emerging digital economy.",
  "url": "https://hawlton.com",
  "slogan": "Partner. Transform. Grow.",
  "logo": {
    "@type": "ImageObject",
    "url": "https://hawlton.com/favicon.svg",
    "width": "200",
    "height": "60"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://hawlton.com/images/backgrounds/home-hero.jpg",
    "width": "1200",
    "height": "630"
  },
  "sameAs": [
    "https://linkedin.com/company/hawlton",
    "https://facebook.com/hawlton",
    "https://twitter.com/hawlton",
    "https://instagram.com/hawlton"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Business District",
    "addressLocality": "Karachi",
    "addressRegion": "Sindh",
    "addressCountry": "Pakistan",
    "postalCode": "74000"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "24.8607",
    "longitude": "67.0011"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+92-XXX-XXXXXXX",
      "contactType": "Customer Service",
      "email": "info@hawlton.com",
      "availableLanguage": ["English", "Urdu"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    },
    {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "partnerships@hawlton.com",
      "availableLanguage": ["English", "Urdu"]
    }
  ],
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Jahangir Hussain",
    "alternateName": "Sarkar Hussain",
    "jobTitle": "Founder & Visionary Lead",
    "description": "Strategic mind behind Hawlton with proven expertise in digital transformation and partnership opportunities"
  },
  "employee": [
    {
      "@type": "Person",
      "name": "Jahangir Hussain",
      "jobTitle": "Founder & Visionary Lead"
    },
    {
      "@type": "Person",
      "name": "Muhammad Ismail",
      "jobTitle": "Co-Founder & Operational Lead"
    }
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Pakistan"
  },
  "serviceType": [
    "Digital Transformation",
    "Strategic Business Partnerships",
    "Digital Growth Solutions",
    "E-commerce Development",
    "Business Development",
    "Digital Marketing Solutions",
    "Technology Consulting"
  ],
  "knowsAbout": [
    "Digital Marketing",
    "E-commerce",
    "Business Development",
    "Growth Strategy",
    "Partnership Development",
    "Pakistan Digital Economy",
    "Strategic Planning",
    "Technology Implementation",
    "Market Expansion",
    "Performance Optimization"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50+",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Hawlton Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Strategic Partnership Program",
          "description": "Transform your business through strategic partnership with exponential growth potential"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Growth Solutions",
          "description": "Comprehensive digital transformation solutions for Pakistan's growing businesses"
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const tawkId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
  // Only load scripts if we have valid IDs
  const shouldLoadGA = gaId && gaId !== 'G-DEVELOPMENT' && gaId.startsWith('G-');
  const shouldLoadTawk = tawkId && tawkId !== 'development-placeholder';
  
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
<body className={`${inter.variable} font-inter antialiased`}>
        {/* Google Analytics - Only load with valid ID */}
        {shouldLoadGA && (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        
        {/* Tawk.to Live Chat - Only load with valid ID */}
        {shouldLoadTawk && (
          <Script
            id="tawk-to-chat"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/${tawkId}/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />
        )}

        {/* Service Worker Registration */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[SW] Registration successful:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('[SW] Registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
        
        {/* BULLETPROOF FOCUS MANAGEMENT SYSTEM */}
        <Script
          id="focus-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // BULLETPROOF Focus Management - 100% Coverage Guarantee
              (function() {
                'use strict';
                
                // Comprehensive list of interactive selectors
                const INTERACTIVE_SELECTORS = [
                  'button', 'a', 'input[type="submit"]', 'input[type="button"]', 'input[type="reset"]',
                  '[role="button"]', '[tabindex]', '[tabindex="0"]', '[tabindex="-1"]',
                  'summary', 'details', 'label[for]',
                  '.btn', '.button', '.nav-item', '.dropdown-item', '.card', '.card-hover', '.card-interactive',
                  '.faq-button', '.accordion-trigger', '.accordion-button', '.tab-button', '.menu-item',
                  '.toggle-button', '.motion-div', '.motion-button', '.interactive-element',
                  '.animated-element', '.hover-element', '[data-framer-name]', '[data-testid]',
                  '[data-cy]', '[data-component]', '.MuiButton-root', '.ant-btn', '.chakra-button'
                ];
                
                // Enhanced focus removal function
                const removeFocus = (element) => {
                  if (element && typeof element.blur === 'function') {
                    try {
                      element.blur();
                      element.style.outline = 'none';
                      element.style.boxShadow = 'none';
                      element.style.border = element.style.border || '';
                      
                      // Remove any lingering focus classes
                      element.classList.remove('focus', 'focused', 'active-focus');
                      
                      // Force style recalculation
                      element.offsetHeight;
                    } catch (e) {
                      // Silently handle any errors
                    }
                  }
                };
                
                // Enhanced interaction handler
                const handleInteraction = (event) => {
                  const target = event.target;
                  if (!target) return;
                  
                  // Check if target matches any interactive element
                  const isInteractive = INTERACTIVE_SELECTORS.some(selector => {
                    try {
                      return target.matches && target.matches(selector);
                    } catch (e) {
                      return false;
                    }
                  });
                  
                  if (isInteractive || target.tagName === 'BUTTON' || target.tagName === 'A' || 
                      target.getAttribute('role') === 'button' || target.hasAttribute('tabindex')) {
                    
                    // Immediate focus removal
                    setTimeout(() => removeFocus(target), 50);
                    
                    // Delayed focus removal for stubborn elements
                    setTimeout(() => removeFocus(target), 150);
                    
                    // Final cleanup
                    setTimeout(() => removeFocus(target), 300);
                  }
                };
                
                // Global event handler for all interactions
                const addGlobalListeners = () => {
                  const events = ['mousedown', 'click', 'touchstart', 'touchend', 'blur', 'focusout'];
                  
                  events.forEach(eventType => {
                    document.addEventListener(eventType, handleInteraction, {
                      capture: true,
                      passive: true
                    });
                  });
                };
                
                // Mutation observer for dynamic content
                const observeChanges = () => {
                  if (typeof MutationObserver === 'undefined') return;
                  
                  const observer = new MutationObserver((mutations) => {
                    let hasNewElements = false;
                    
                    mutations.forEach(mutation => {
                      if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                          if (node.nodeType === Node.ELEMENT_NODE) {
                            hasNewElements = true;
                          }
                        });
                      }
                    });
                    
                    if (hasNewElements) {
                      setTimeout(() => {
                        // Apply focus removal to new elements
                        const newElements = document.querySelectorAll(INTERACTIVE_SELECTORS.join(', '));
                        newElements.forEach(element => {
                          element.addEventListener('mousedown', handleInteraction, { passive: true });
                          element.addEventListener('click', handleInteraction, { passive: true });
                        });
                      }, 100);
                    }
                  });
                  
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true
                  });
                };
                
                // Enhanced style injection
                const injectStyles = () => {
                  const styleId = 'bulletproof-focus-manager';
                  if (document.getElementById(styleId)) return;
                  
                  const style = document.createElement('style');
                  style.id = styleId;
                  style.textContent = \`
                    /* BULLETPROOF FOCUS REMOVAL - MAXIMUM COVERAGE */
                    button:focus:not(:focus-visible),
                    a:focus:not(:focus-visible),
                    input:focus:not(:focus-visible),
                    textarea:focus:not(:focus-visible),
                    select:focus:not(:focus-visible),
                    [role="button"]:focus:not(:focus-visible),
                    [tabindex]:focus:not(:focus-visible),
                    [tabindex="0"]:focus:not(:focus-visible),
                    [tabindex="-1"]:focus:not(:focus-visible),
                    summary:focus:not(:focus-visible),
                    details:focus:not(:focus-visible),
                    label:focus:not(:focus-visible),
                    .btn:focus:not(:focus-visible),
                    .button:focus:not(:focus-visible),
                    .nav-item:focus:not(:focus-visible),
                    .dropdown-item:focus:not(:focus-visible),
                    .card:focus:not(:focus-visible),
                    .card-hover:focus:not(:focus-visible),
                    .card-interactive:focus:not(:focus-visible),
                    .faq-button:focus:not(:focus-visible),
                    .accordion-trigger:focus:not(:focus-visible),
                    .accordion-button:focus:not(:focus-visible),
                    [data-framer-name]:focus:not(:focus-visible),
                    .motion-div:focus:not(:focus-visible),
                    .motion-button:focus:not(:focus-visible),
                    .interactive-element:focus:not(:focus-visible) {
                      outline: none !important;
                      box-shadow: none !important;
                      border-color: inherit !important;
                    }
                    
                    /* Ensure accessibility is preserved */
                    :focus-visible {
                      outline: 2px solid #FFD700 !important;
                      outline-offset: 2px !important;
                      box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.2) !important;
                    }
                    
                    /* Remove tap highlights */
                    * {
                      -webkit-tap-highlight-color: transparent;
                    }
                  \`;
                  
                  document.head.appendChild(style);
                };
                
                // Comprehensive initialization
                const init = () => {
                  try {
                    injectStyles();
                    addGlobalListeners();
                    observeChanges();
                    
                    // Initial cleanup of existing elements
                    setTimeout(() => {
                      const elements = document.querySelectorAll(INTERACTIVE_SELECTORS.join(', '));
                      elements.forEach(element => {
                        if (element !== document.activeElement) {
                          removeFocus(element);
                        }
                      });
                    }, 500);
                    
                    console.log('🎯 Bulletproof Focus Manager: Initialized successfully');
                  } catch (error) {
                    console.warn('Focus Manager initialization warning:', error);
                  }
                };
                
                // Multi-stage initialization for maximum compatibility
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', init);
                } else if (document.readyState === 'interactive') {
                  setTimeout(init, 0);
                } else {
                  init();
                }
                
                // Backup initialization
                setTimeout(init, 1000);
                
                // Final initialization on window load
                window.addEventListener('load', init);
                
              })();
            `,
          }}
        />
        
        <LanguageProvider>
          <LoadingProvider>
            <ToastProvider>
              <ErrorBoundary>
                <ScrollProgress showReadingTime={true} />
                <AccessibilityEnhancer />
                <Header />
                <main id="main-content">{children}</main>
                <Footer />
                <BackToTop />
                <GDPRCookieConsent />
              </ErrorBoundary>
            </ToastProvider>
          </LoadingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
