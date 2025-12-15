import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Natural Clinic Brand Color #006069
        brand: {
          50: '#e6f3f4',
          100: '#b3dce0',
          200: '#80c5cb',
          300: '#4daeb7',
          400: '#2699a3',
          500: '#006069', // Ana marka rengi
          600: '#00565e',
          700: '#004a51',
          800: '#003d43',
          900: '#002d32',
          950: '#001f23',
        },
        // Accent colors
        accent: {
          gold: '#c9a227',
          light: '#e8d48a',
        },
        // Neutral tones
        cream: '#faf9f6',
        ivory: '#f5f4f0',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #006069 0%, #008080 50%, #006069 100%)',
        'hero-gradient': 'linear-gradient(135deg, #006069 0%, #004a51 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'brand': '0 4px 20px rgba(0, 96, 105, 0.15)',
        'brand-lg': '0 10px 40px rgba(0, 96, 105, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
