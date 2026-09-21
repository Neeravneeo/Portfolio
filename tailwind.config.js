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
        space: {
          950: '#04060a',
          900: '#070a12',
          850: '#0b101c',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        designer: {
          accent: '#8b5cf6', // Violet
          secondary: '#ec4899', // Pink
          glow: 'rgba(139, 92, 246, 0.35)',
          subtle: 'rgba(139, 92, 246, 0.1)',
        },
        engineer: {
          accent: '#10b981', // Emerald
          secondary: '#06b6d4', // Cyan
          glow: 'rgba(16, 185, 129, 0.35)',
          subtle: 'rgba(16, 185, 129, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-designer': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-engineer': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'cosmic-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
