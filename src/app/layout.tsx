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
  title: "Hawlton - Pakistan's Premier Digital Transformation & Investment Partner",
  description: "Empowering Pakistani businesses through strategic digital partnerships and secure investment opportunities. Transform your local business into a national digital powerhouse with proven ROI and sustainable growth strategies.",
  keywords: "Pakistan digital transformation, strategic business partnerships, digital investment opportunities, e-commerce growth Pakistan, online business development, Pakistan startup ecosystem, digital marketing Pakistan, business scaling solutions, venture capital Pakistan, digital economy investment",
  authors: [{ name: "Hawlton" }],
  creator: "Hawlton",
  publisher: "Hawlton",
  robots: "index, follow",
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Hawlton - Empowering Pakistan's Digital Future",
    description: "Catalyzing National Digital Transformation through Strategic Partnerships & Impactful Investment.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hawlton.com",
    siteName: "Hawlton",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/backgrounds/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Hawlton - Digital Transformation Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawlton - Empowering Pakistan's Digital Future",
    description: "Catalyzing National Digital Transformation through Strategic Partnerships & Impactful Investment.",
    creator: "@hawlton",
    images: ["/images/backgrounds/home-hero.jpg"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://hawlton.com",
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
  "description": "Empowering Pakistan's Digital Future through Strategic Partnerships and Impactful Investment. Leading digital transformation company specializing in e-commerce, business development, and strategic investment opportunities in Pakistan's emerging digital economy.",
  "url": "https://hawlton.com",
  "slogan": "Partner. Invest. Grow.",
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
    },
    {
      "@type": "ContactPoint",
      "contactType": "Investment Inquiries",
      "email": "invest@hawlton.com",
      "availableLanguage": ["English"]
    }
  ],
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Jahangir Hussain",
    "alternateName": "Sarkar Hussain",
    "jobTitle": "Founder & Visionary Lead",
    "description": "Strategic mind behind Hawlton with proven expertise in digital transformation and investment opportunities"
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
    "Investment Opportunities",
    "E-commerce Development",
    "Business Development",
    "Digital Marketing Solutions",
    "Technology Consulting"
  ],
  "knowsAbout": [
    "Digital Marketing",
    "E-commerce",
    "Business Development",
    "Investment Management",
    "Partnership Development",
    "Pakistan Digital Economy",
    "Strategic Planning",
    "Technology Implementation",
    "Market Expansion",
    "ROI Optimization"
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
          "name": "Investment Opportunities",
          "description": "High-return investment opportunities in Pakistan's digital economy"
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
      <body className="font-inter antialiased bg-primary-platinum text-primary-charcoal">
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
                      
                      // Check for updates
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              // New content is available, notify user
                              if (confirm('New content is available. Would you like to refresh to get the latest version?')) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                              }
                            }
                          });
                        }
                      });
                    })
                    .catch(function(error) {
                      console.log('[SW] Registration failed:', error);
                    });
                });
              }
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
