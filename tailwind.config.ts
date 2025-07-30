import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hawlton "Pinnacle of Trust" Color Scheme
        'primary-navy': '#1A3A5F',
        'primary-platinum': '#F5F8FA',
        'primary-charcoal': '#333333',
        'primary-silver': '#A0A0A0',
        'primary-gold': '#FFD700',
        'metallic-gold': '#D4AF37',
        'primary-white': '#FFFFFF',
        'accent-primary': '#FFD700',
        'error': '#EF4444',
        'success': '#10B981',
        'warning': '#F59E0B',
        'info': '#3B82F6',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Elite Typography Scale - From Design Prompt
        // Desktop
        'h1-desktop': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'h2-desktop': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h3-desktop': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h4-desktop': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h5-desktop': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h6-desktop': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '500' }],
        'body-desktop': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0em', fontWeight: '400' }],
        'lead-desktop': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' }],
        // Mobile
        'h1-mobile': ['3rem', { lineHeight: '1.15' }],
        'h2-mobile': ['2.5rem', { lineHeight: '1.2' }],
        'h3-mobile': ['2rem', { lineHeight: '1.3' }],
        'h4-mobile': ['1.5rem', { lineHeight: '1.4' }],
        'body-mobile': ['1rem', { lineHeight: '1.6' }],
        'lead-mobile': ['1.125rem', { lineHeight: '1.5' }],
        'micro-mobile': ['0.75rem', { lineHeight: '1.4' }],
        // Specific Elements
        'micro': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'button-sm': ['0.875rem', { letterSpacing: '0.02em', fontWeight: '600' }],
        'button-md': ['1rem', { letterSpacing: '0.02em', fontWeight: '600' }],
        'button-lg': ['1.125rem', { letterSpacing: '0.02em', fontWeight: '600' }],
        'button-xl': ['1.25rem', { letterSpacing: '0.02em', fontWeight: '600' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-scale': 'fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-right': 'slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scale-in': 'scaleIn 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFD700 100%)',
        'gradient-navy': 'linear-gradient(135deg, #1A3A5F 0%, #2A4A6F 100%)',
        'gradient-platinum': 'linear-gradient(135deg, #F5F8FA 0%, #E6EAED 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.15)',
        'navy': '0 4px 14px 0 rgba(26, 58, 95, 0.15)',
        'premium': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }: { addUtilities: any; theme: any }) {
      const delayUtilities = Object.entries(theme('animationDelay')).reduce((acc, [key, value]) => {
        acc[`.delay-${key}`] = { 'animation-delay': value };
        return acc;
      }, {} as Record<string, any>);
      
      addUtilities(delayUtilities);
    }
  ],
};
export default config;
