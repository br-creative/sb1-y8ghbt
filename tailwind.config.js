/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#1e1e1e',
          green: '#00c756',
          white: '#ffffff',
          grey: '#c0c0c0',
        },
      },
      fontFamily: {
        display: ['"neue-haas-grotesk-display"', 'sans-serif'],
        body: ['"neue-haas-grotesk-text"', 'sans-serif'],
      },
      fontSize: {
        'heading': ['28px', '34px'],
        'body': ['16px', '24px'],
      },
    },
  },
  plugins: [],
};