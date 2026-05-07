/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F7FFF',
        secondary: '#00D4FF',
        accent: '#1FBDFF',
        dark: '#0A0E27',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F7FFF 0%, #00D4FF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #00D4FF 0%, #1FBDFF 100%)',
        'gradient-soft': 'linear-gradient(135deg, rgba(15, 127, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glow': '0 0 20px rgba(15, 127, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(15, 127, 255, 0.2)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15, 127, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(15, 127, 255, 0.5)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
