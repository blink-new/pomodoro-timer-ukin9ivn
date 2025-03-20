/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'rgba(15, 23, 42, 0.8)',
          light: 'rgba(248, 250, 252, 0.8)'
        },
        primary: {
          DEFAULT: '#818CF8',
          light: '#4F46E5'
        },
        accent: {
          DEFAULT: '#34D399',
          light: '#6EE7B7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}