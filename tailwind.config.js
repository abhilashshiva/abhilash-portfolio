/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0A0A',
          surface: '#141414',
          elevated: '#1C1C1C',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
          text: '#F5F3EE',
          muted: '#999999',
          subtle: '#666666',
        },
        light: {
          bg: '#F3F0E9',
          surface: '#FFFFFF',
          elevated: '#E8E4DA',
          border: 'rgba(0, 0, 0, 0.08)',
          'border-hover': 'rgba(0, 0, 0, 0.16)',
          text: '#121212',
          muted: '#63625E',
          subtle: '#8C8A84',
        },
        accent: {
          DEFAULT: '#C9EDB9',
          hover: '#BAE6A7',
          dark: '#9AC988',
          glow: 'rgba(201, 237, 185, 0.25)',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'pill': '0 8px 32px -4px rgba(0, 0, 0, 0.35)',
        'pill-light': '0 8px 30px -4px rgba(0, 0, 0, 0.08)',
        'card-glow': '0 0 50px -10px rgba(201, 237, 185, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
