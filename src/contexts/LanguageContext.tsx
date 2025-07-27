'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'EN' | 'UR'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Navigation
    'nav.about': 'About Us',
    'nav.solutions': 'Solutions',
    'nav.partner': 'Partner',
    'nav.invest': 'Invest',
    'nav.contact': 'Contact',
    'nav.careers': 'Careers',
    
    // About submenu
    'nav.about.overview': 'Overview',
    'nav.about.team': 'Our Team', 
    'nav.about.vision': 'Our Vision',
    'nav.about.awards': 'Awards & Recognition',
    'nav.about.overview.desc': 'Learn about Hawlton\'s mission and vision',
    'nav.about.team.desc': 'Meet our expert leadership team',
    'nav.about.vision.desc': 'Our roadmap for Pakistan\'s digital future',
    'nav.about.awards.desc': 'Industry recognition and achievements',
    
    // Solutions submenu
    'nav.solutions.digital': 'Digital Transformation',
    'nav.solutions.partnerships': 'Partnership Programs',
    'nav.solutions.investment': 'Investment Services',
    'nav.solutions.success': 'Success Stories',
    'nav.solutions.digital.desc': 'Enterprise modernization solutions',
    'nav.solutions.partnerships.desc': 'Strategic collaboration opportunities',
    'nav.solutions.investment.desc': 'Professional investment management',
    'nav.solutions.success.desc': 'Client transformation case studies',
    
    // Partner submenu
    'nav.partner.types': 'Partnership Types',
    'nav.partner.apply': 'Application Process',
    'nav.partner.portal': 'Partner Portal',
    'nav.partner.resources': 'Resources',
    'nav.partner.types.desc': 'Explore partnership opportunities',
    'nav.partner.apply.desc': 'Step-by-step application guide',
    'nav.partner.portal.desc': 'Access partner resources',
    'nav.partner.resources.desc': 'Tools and documentation',
    
    // Invest submenu
    'nav.invest.opportunities': 'Investment Opportunities',
    'nav.invest.portfolio': 'Portfolio',
    'nav.invest.relations': 'Investor Relations',
    'nav.invest.docs': 'Documentation',
    'nav.invest.opportunities.desc': 'Current investment options',
    'nav.invest.portfolio.desc': 'Our investment portfolio',
    'nav.invest.relations.desc': 'Connect with our investor team',
    'nav.invest.docs.desc': 'Legal and compliance documents',
    
    // Contact submenu
    'nav.contact.touch': 'Get in Touch',
    'nav.contact.locations': 'Office Locations',
    'nav.contact.touch.desc': 'Contact our team directly',
    'nav.contact.locations.desc': 'Find our offices across Pakistan',
    'nav.contact.careers.desc': 'Join our growing team',
    
    // Homepage sections
    'home.hero.title': 'Empowering Pakistan\'s Digital Future',
    'home.hero.subtitle': 'We transform ambitious Pakistani businesses into national digital leaders through strategic partnerships and secure investment opportunities, delivering measurable growth and sustainable ROI across Pakistan\'s thriving digital economy.',
    'home.hero.partner.btn': 'Start Your Digital Growth Journey',
    'home.hero.invest.btn': 'Explore Investment Opportunities',
    
    // Value Proposition
    'home.value.title': 'Driving Digital Growth Through Strategic Partnerships',
    'home.value.subtitle': 'Hawlton bridges the gap between traditional businesses and digital excellence, creating sustainable partnerships that benefit all stakeholders in Pakistan\'s growing economy.',
    'home.value.growth.title': 'Digital Growth',
    'home.value.growth.desc': 'Transform local presence into national reach',
    'home.value.partnership.title': 'Partnership',
    'home.value.partnership.desc': 'Collaborative approach for shared success',
    'home.value.security.title': 'Security',
    'home.value.security.desc': 'Transparent and secure operations',
    'home.value.impact.title': 'Impact',
    'home.value.impact.desc': 'Creating measurable economic value',
    
    // Approach Section
    'home.approach.title': 'Strategic Partnerships & Impact Investment for Accelerated Growth.',
    'home.approach.desc1': 'Hawlton collaborates closely with partners, leveraging existing assets and our deep digital expertise to co-create and scale online ventures.',
    'home.approach.desc2': 'We offer a transparent, secure platform for investors to participate directly in Pakistan\'s digital economic boom, ensuring mutual success and sustainable expansion.',
    'home.approach.step1': 'Partner',
    'home.approach.step1.desc': 'Collaborate with ambitious businesses ready for digital transformation',
    'home.approach.step2': 'Transform',
    'home.approach.step2.desc': 'Build robust digital infrastructure and scale operations nationwide',
    'home.approach.step3': 'Grow',
    'home.approach.step3.desc': 'Achieve sustainable growth through optimized digital channels',
    
    // Common
    'common.search': 'Search...',
    'common.get_started': 'Get Started',
  },
  UR: {
    // Navigation
    'nav.about': 'ہمارے بارے میں',
    'nav.solutions': 'حل',
    'nav.partner': 'شراکت دار',
    'nav.invest': 'سرمایہ کاری',
    'nav.contact': 'رابطہ',
    'nav.careers': 'کریئر',
    
    // About submenu
    'nav.about.overview': 'جائزہ',
    'nav.about.team': 'ہماری ٹیم',
    'nav.about.vision': 'ہمارا وژن',
    'nav.about.awards': 'ایوارڈز اور پہچان',
    'nav.about.overview.desc': 'Hawlton کے مشن اور وژن کے بارے میں جانیں',
    'nav.about.team.desc': 'ہماری ماہر قیادت کی ٹیم سے ملیں',
    'nav.about.vision.desc': 'پاکستان کے ڈیجیٹل مستقبل کے لیے ہمارا روڈ میپ',
    'nav.about.awards.desc': 'صنعتی تسلیم اور کامیابیاں',
    
    // Solutions submenu  
    'nav.solutions.digital': 'ڈیجیٹل تبدیلی',
    'nav.solutions.partnerships': 'شراکت داری پروگرام',
    'nav.solutions.investment': 'سرمایہ کاری کی خدمات',
    'nav.solutions.success': 'کامیابی کی کہانیاں',
    'nav.solutions.digital.desc': 'انٹرپرائز جدیدیت کے حل',
    'nav.solutions.partnerships.desc': 'اسٹریٹجک تعاون کے مواقع',
    'nav.solutions.investment.desc': 'پیشہ ورانہ سرمایہ کاری کا انتظام',
    'nav.solutions.success.desc': 'کلائنٹ کی تبدیلی کے کیس اسٹڈیز',
    
    // Partner submenu
    'nav.partner.types': 'شراکت کی اقسام',
    'nav.partner.apply': 'درخواست کا عمل',
    'nav.partner.portal': 'پارٹنر پورٹل',
    'nav.partner.resources': 'وسائل',
    'nav.partner.types.desc': 'شراکت کے مواقع دریافت کریں',
    'nav.partner.apply.desc': 'قدم بہ قدم درخواست گائیڈ',
    'nav.partner.portal.desc': 'پارٹنر کے وسائل تک رسائی',
    'nav.partner.resources.desc': 'ٹولز اور دستاویزات',
    
    // Invest submenu
    'nav.invest.opportunities': 'سرمایہ کاری کے مواقع',
    'nav.invest.portfolio': 'پورٹ فولیو',
    'nav.invest.relations': 'سرمایہ کار کے تعلقات',
    'nav.invest.docs': 'دستاویزات',
    'nav.invest.opportunities.desc': 'موجودہ سرمایہ کاری کے اختیارات',
    'nav.invest.portfolio.desc': 'ہمارا سرمایہ کاری پورٹ فولیو',
    'nav.invest.relations.desc': 'ہماری پرمایہ کار ٹیم سے رابطہ کریں',
    'nav.invest.docs.desc': 'قانونی اور کمپلائنس دستاویزات',
    
    // Contact submenu
    'nav.contact.touch': 'رابطے میں رہیں',
    'nav.contact.locations': 'دفتر کے مقامات',
    'nav.contact.touch.desc': 'براہ راست ہماری ٹیم سے رابطہ کریں',
    'nav.contact.locations.desc': 'پاکستان بھر میں ہمارے دفاتر تلاش کریں',
    'nav.contact.careers.desc': 'ہماری بڑھتی ہوئی ٹیم میں شامل ہوں',
    
    // Homepage sections
    'home.hero.title': 'پاکستان کے ڈیجیٹل مستقبل کو بااختیار بنانا',
    'home.hero.subtitle': 'ہم اسٹریٹجک شراکت داری اور محفوظ سرمایہ کاری کے مواقع کے ذریعے پرامید پاکستانی کاروبار کو قومی ڈیجیٹل رہنماؤں میں تبدیل کرتے ہیں، پاکستان کی ترقی پذیر ڈیجیٹل معیشت میں قابل پیمائش نمو اور پائیدار ROI فراہم کرتے ہیں۔',
    'home.hero.partner.btn': 'اپنا ڈیجیٹل نمو کا سفر شروع کریں',
    'home.hero.invest.btn': 'سرمایہ کاری کے مواقع دریافت کریں',
    
    // Value Proposition
    'home.value.title': 'اسٹریٹجک شراکت داری کے ذریعے ڈیجیٹل نمو کو آگے بڑھانا',
    'home.value.subtitle': 'Hawlton روایتی کاروبار اور ڈیجیٹل بہترین کے درمیان خلا کو پاٹتا ہے، پائیدار شراکت داری بناتا ہے جو پاکستان کی بڑھتی ہوئی معیشت میں تمام اسٹیک ہولڈرز کو فائدہ پہنچاتا ہے۔',
    'home.value.growth.title': 'ڈیجیٹل نمو',
    'home.value.growth.desc': 'مقامی موجودگی کو قومی رسائی میں تبدیل کریں',
    'home.value.partnership.title': 'شراکت داری',
    'home.value.partnership.desc': 'مشترکہ کامیابی کے لیے باہمی تعاون کا طریقہ',
    'home.value.security.title': 'سیکیورٹی',
    'home.value.security.desc': 'شفاف اور محفوظ آپریشنز',
    'home.value.impact.title': 'اثرات',
    'home.value.impact.desc': 'قابل پیمائش اقتصادی قدر پیدا کرنا',
    
    // Approach Section
    'home.approach.title': 'تیز رفتار ترقی کے لیے اسٹریٹجک شراکت داری اور اثر انگیز سرمایہ کاری۔',
    'home.approach.desc1': 'Hawlton شراکت داروں کے ساتھ قریبی تعاون کرتا ہے، موجودہ اثاثوں اور ہماری گہری ڈیجیٹل مہارت کا فائدہ اٹھا کر آن لائن منصوبوں کو مشترکہ طور پر بنانے اور پیمانے پر لانے کے لیے۔',
    'home.approach.desc2': 'ہم سرمایہ کاروں کے لیے پاکستان کی ڈیجیٹل اقتصادی تیزی میں براہ راست حصہ لینے کے لیے ایک شفاف، محفوظ پلیٹ فارم پیش کرتے ہیں، باہمی کامیابی اور پائیدار توسیع کو یقینی بناتے ہیں۔',
    'home.approach.step1': 'شراکت دار',
    'home.approach.step1.desc': 'ڈیجیٹل تبدیلی کے لیے تیار پرامید کاروبار کے ساتھ تعاون کریں',
    'home.approach.step2': 'تبدیل کریں',
    'home.approach.step2.desc': 'مضبوط ڈیجیٹل انفراسٹرکچر بنائیں اور آپریشنز کو قومی سطح پر پیمانے پر لائیں',
    'home.approach.step3': 'بڑھیں',
    'home.approach.step3.desc': 'بہتر ڈیجیٹل چینلز کے ذریعے پائیدار نمو حاصل کریں',
    
    // Common
    'common.search': 'تلاش کریں...',
    'common.get_started': 'شروع کریں',
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('hawlton-language') as Language
    if (savedLanguage && (savedLanguage === 'EN' || savedLanguage === 'UR')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('hawlton-language', language)
    // Update document direction for RTL
    document.documentElement.dir = language === 'UR' ? 'rtl' : 'ltr'
    document.documentElement.lang = language === 'UR' ? 'ur' : 'en'
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
