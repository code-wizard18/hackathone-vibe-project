/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0A09',
        card: {
          DEFAULT: '#191512',
          elevated: '#221C18',
          hover: '#29221D',
          muted: '#14110E',
        },
        border: {
          DEFAULT: '#393027',
          subtle: '#26201A',
          strong: '#54463A',
        },
        copper: {
          DEFAULT: '#D99055',
          light: '#F0AA75',
          dark: '#B87239',
          faint: '#D9905515',
          glow: '#D9905530',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          muted: '#A89F91',
          faint: '#6E655B',
          dark: '#403830',
        },
        critical: {
          DEFAULT: '#F05252',
          faint: '#F0525215',
          border: '#F0525240',
        },
        emerald: {
          DEFAULT: '#35C98A',
          faint: '#35C98A15',
          border: '#35C98A40',
        },
        amber: {
          alert: '#E5A93C',
          faint: '#E5A93C15',
          border: '#E5A93C40',
        }
      },
      boxShadow: {
        'copper-glow': '0 0 25px -5px rgba(217, 144, 85, 0.25)',
        'copper-sm': '0 0 12px -2px rgba(217, 144, 85, 0.20)',
        'critical-glow': '0 0 20px -3px rgba(240, 82, 82, 0.25)',
        'emerald-glow': '0 0 20px -3px rgba(53, 201, 138, 0.25)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
