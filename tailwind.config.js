/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          green: '#00ff41',
          dim: '#00802a',
          muted: '#1a4d2e',
          bg: '#0a0a0a',
          card: '#0f0f0f',
          elevated: '#141414',
          border: '#003d15',
          'border-bright': '#00ff41',
        },
        orange: {
          hack: '#ff6b35',
        },
        cyan: {
          hack: '#00ffff',
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'terminal-flicker': 'terminal-flicker 5s infinite',
        'fade-in-up': 'fade-in-up 0.25s ease forwards',
        'slide-up': 'slide-up 0.2s ease forwards',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'terminal-flicker': {
          '0%, 100%': { opacity: '1' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.85' },
          '99%': { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(0, 255, 65, 0.3)' },
          '50%': { boxShadow: '0 0 16px rgba(0, 255, 65, 0.6)' },
        },
      },
      boxShadow: {
        'terminal': '0 0 8px rgba(0, 255, 65, 0.3), 0 0 20px rgba(0, 255, 65, 0.1)',
        'terminal-strong': '0 0 12px rgba(0, 255, 65, 0.5), 0 0 30px rgba(0, 255, 65, 0.2)',
        'orange': '0 0 8px rgba(255, 107, 53, 0.4)',
      },
    },
  },
  plugins: [],
};