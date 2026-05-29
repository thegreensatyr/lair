/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'vivid-green': '#00C851',
        'forest-green': '#1A4D2E',
        'deep-green': '#0D2B1A',
        'abyss': '#020B18',
        'deep-blue': '#051A2E',
        'midnight': '#071E3D',
        'steel-blue': '#0A3055',
        'gold': '#D4AF37',
        'gold-bright': '#FFD700',
        'gold-dark': '#8B7320',
        'rust': '#C0392B',
        'amber-gs': '#E67E22',
        'ember': '#FF6B35',
        'copper': '#B5651D',
      },
      fontFamily: {
        'display': ['"Cinzel Decorative"', 'serif'],
        'body': ['"Rajdhani"', 'sans-serif'],
        'mono': ['"Share Tech Mono"', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.3)',
        'neon-sm': '0 0 8px rgba(57,255,20,0.5), 0 0 16px rgba(57,255,20,0.2)',
        'gold': '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3)',
        'gold-sm': '0 0 8px rgba(212,175,55,0.5)',
        'inner-neon': 'inset 0 0 20px rgba(57,255,20,0.1)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px #39FF14' },
          '50%': { textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' },
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          'from': { boxShadow: '0 0 10px rgba(57,255,20,0.3), 0 0 20px rgba(57,255,20,0.1)' },
          'to': { boxShadow: '0 0 25px rgba(57,255,20,0.8), 0 0 50px rgba(57,255,20,0.4)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
