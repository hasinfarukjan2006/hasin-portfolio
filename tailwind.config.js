/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#0b0f19',
          100: '#0d1322',
          200: '#111827',
          300: '#1e293b',
          400: '#334155',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          accent: '#60a5fa',
        },
        purpleAccent: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        cyanAccent: {
          400: '#22d3ee',
          500: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.9), rgba(11, 15, 25, 0.95))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 15s linear infinite',
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
