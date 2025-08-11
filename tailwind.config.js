/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
      colors: {
        primary: '#7c3aed',
        secondary: '#0ea5e9',
        accent: '#f59e0b',
        success: '#16a34a',
        warning: '#f59e0b',
        danger: '#ef4444',
        neutral: '#0f172a',
        muted: '#64748b',
        background: '#f8fafc',
        surface: '#ffffff',
      },
      fontSize: {
        // Escala tipográfica base (mobile-first)
        display: ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 60px
        h1: ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 36px
        h2: ['1.875rem', { lineHeight: '1.3' }], // 30px
        h3: ['1.5rem', { lineHeight: '1.35' }], // 24px
        lead: ['1.125rem', { lineHeight: '1.6' }], // 18px
        body: ['1rem', { lineHeight: '1.7' }], // 16px
        small: ['0.875rem', { lineHeight: '1.6' }], // 14px
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }], // 12px
      },
    },
  },
  plugins: [],
};


