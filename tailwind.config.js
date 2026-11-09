/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'var(--color-navy)',
          dark: 'var(--color-navy-dark)',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          light: 'var(--color-gold-light)',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          700: '#b45309',
          800: '#92400e',
        },
        cream: {
          DEFAULT: 'var(--color-cream)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
        },
        // Keep existing academic colors for backward compatibility
        academic: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          navy: '#1E3A8A',
          blue: '#1E3A8A',
          gold: '#B45309',
          crimson: '#881337',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)',
        glass: '0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '30px 30px',
      },
    },
  },
  plugins: [],
};
