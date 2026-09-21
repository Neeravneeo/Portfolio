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
        // Dala Pure Void Tokens
        void: '#000000',
        'bone-white': '#ffffff',
        'ash-gray': '#9a9a9a',
        'silver-mist': '#bdbdbd',
        'electric-iris': '#8052ff',
        'saffron-spark': '#ffb829',
        'deep-verdant': '#15846e',

        // Cosmic Palette
        space: {
          950: '#000000', // Pure Void Black
          900: '#06080f',
          850: '#0b101c',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        designer: {
          accent: '#8052ff', // Electric Iris
          secondary: '#ec4899', // Pink
          glow: 'rgba(128, 82, 255, 0.35)',
          subtle: 'rgba(128, 82, 255, 0.1)',
        },
        engineer: {
          accent: '#10b981', // Emerald
          secondary: '#06b6d4', // Cyan
          glow: 'rgba(16, 185, 129, 0.35)',
          subtle: 'rgba(16, 185, 129, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'PPNeueMontreal', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontWeight: {
        extralight: '200',
        regular: '400',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        'display': '-4.52px',
        'heading-lg': '-3.12px',
        'heading-sm': '-1.68px',
        'heading-2xs': '-0.48px',
        'nav-label': '0.35px',
      },
      borderRadius: {
        'pill': '9999px',
        'dala': '24px',
      },
      boxShadow: {
        'glow-designer': '0 0 25px -5px rgba(128, 82, 255, 0.45)',
        'glow-engineer': '0 0 25px -5px rgba(16, 185, 129, 0.45)',
        'cosmic-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
