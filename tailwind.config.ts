import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        milo: {
          orange: '#FF5722',
          'orange-hover': '#E64A19',
          'orange-light': '#FFF0EC',
          coral: '#FF4081',
          'coral-light': '#FFF0F5',
          navy: '#0F172A',
          'navy-card': '#1E293B',
          cream: '#FAFAF9',
          'cream-warm': '#F5F5F0',
          purple: '#6366F1',
          'purple-light': '#EEF2FF',
          emerald: '#10B981',
          dark: '#0B0F19',
        }
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 8px 30px rgba(255, 87, 34, 0.25)',
        'glow-coral': '0 8px 30px rgba(255, 64, 129, 0.25)',
        'card-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 32px -4px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
