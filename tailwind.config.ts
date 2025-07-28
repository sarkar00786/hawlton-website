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
        primary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          200: '#b5cde3',
          300: '#86abd0',
          400: '#5a85ba',
          500: '#1A3A5F',        // Deep Sapphire Navy - Primary Background
          600: '#173451',
          700: '#142d44',
          800: '#12263a',
          900: '#111f31',
          navy: '#1A3A5F',        // Deep Sapphire Navy - Primary Background
          platinum: '#F5F8FA',    // Soft Platinum Gray - Secondary Background
          white: '#FFFFFF',       // Pure White - Headings on dark
          silver: '#A0B0C0',      // Refined Silver-Blue Gray - Subheadings
          charcoal: '#333333',    // Classic Charcoal - Body text
          gold: '#FFD700',        // Vibrant Classic Gold - Primary accent/CTAs
          'gold-metallic': '#FFD700', // Vibrant Gold - Consistent accent
          'dusty-teal': '#5A9B9B', // Dusty Teal - Professional secondary accent
        },
        secondary: {
          50: '#F5F8FA',         // Soft Platinum Gray
          100: '#E6EAED',
          200: '#CDD5DA',
          300: '#B4C0C7',
          400: '#A0B0C0',        // Refined Silver-Blue Gray
          500: '#8A9BA8',
          600: '#748591',
          700: '#5E707A',
          800: '#485A63',
          900: '#32444C',
        },
        accent: {
          primary: '#FFD700',      // Vibrant Classic Gold
          secondary: '#FFD700',    // Vibrant Gold
          hover: '#E6C200',
          focus: '#F4E04D',
        },
        text: {
          primary: '#FFFFFF',      // Pure White for headings on dark
          secondary: '#333333',    // Classic Charcoal for body text
          muted: '#A0B0C0',        // Refined Silver-Blue Gray for subheadings
          light: '#F5F8FA',        // Soft Platinum Gray for text on dark
        },
        // Alias for easier usage
        background: '#F5F8FA',
        foreground: '#333333',
      },
      fontFamily: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'subtitle': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
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
