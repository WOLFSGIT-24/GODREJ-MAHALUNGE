/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.025em' }],
        sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.015em' }],
        base: ['1rem', { lineHeight: '1.65', letterSpacing: '0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.65', letterSpacing: '0.005em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '0' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0' }],
        '6xl': ['3.75rem', { lineHeight: '1.15', letterSpacing: '0' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0' }],
        '8xl': ['6rem', { lineHeight: '1.08', letterSpacing: '0' }],
        '9xl': ['8rem', { lineHeight: '1.05', letterSpacing: '0' }],
      },

      fontFamily: {
        sans: ['"GT Ultra Median"', 'Georgia', 'serif'],
        serif: ['"GT Ultra Median"', 'Georgia', 'serif'],
        display: ['"GT Ultra Median"', 'Georgia', 'serif'],
        body: ['"GT Ultra Median"', 'Georgia', 'serif'],
        heading: ['"GT Ultra Median"', 'Georgia', 'serif'],
        paragraph: ['"GT Ultra Median"', 'Georgia', 'serif'],
        gtultra: ['"GT Ultra Median"', 'Georgia', 'serif'],
        georgia: ['"GT Ultra Median"', 'Georgia', 'serif'],
        script: ['"GT Ultra Median"', 'Georgia', 'serif'],
      },

      colors: {
        /* Runwal Auris PDF Official Color Palette */
        'auris-navy': '#0B1E34',
        'auris-navy-dark': '#071525',
        'auris-navy-light': '#163354',
        'auris-navy-soft': '#224368',
        
        'auris-gold': '#C5A869',
        'auris-gold-light': '#DFC896',
        'auris-gold-dark': '#9E7F41',
        
        'auris-cream': '#FAF6EE',
        'auris-cream-light': '#FDFBF7',
        'auris-cream-dark': '#EFE7D8',
        'auris-sand': '#E4D7C1',
        
        'auris-charcoal': '#1C2633',
        'auris-muted': '#5C6B7E',

        /* Theme Aliases */
        'old-lace': '#FAF6EE',
        'off-white': '#FDFBF7',
        'warm-beige': '#EFE7D8',
        'pale-sage': '#C5A869',

        'warm-espresso': '#0B1E34',
        'soft-charcoal': '#0B1E34',
        'muted-gray': '#5C6B7E',
        'light-gray': '#C5A869',

        /* System */
        background: '#FAF6EE',
        foreground: '#0B1E34',
        secondary: '#EFE7D8',
        'secondary-foreground': '#0B1E34',

        /* Accent */
        primary: '#0B1E34',
        'primary-foreground': '#FAF6EE',
        gold: '#C5A869',

        /* Alerts */
        destructive: '#D32F2F',
        'destructive-foreground': '#FFFFFF',
      },

      animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    // Height variants for short windows (laptops, landscape phones). Added as variants,
    // not screens: raw screens would switch off Tailwind's max-* width variants.
    ({ addVariant }) => {
      addVariant('short', '@media (max-height: 760px)');
      addVariant('tiny', '@media (max-height: 560px)');
      addVariant('micro', '@media (max-height: 480px)');
    },
  ],
};
