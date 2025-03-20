/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50: '#EBEAFD',
          100: '#D7D5FB',
          200: '#AEAAF7',
          300: '#867FF3',
          400: '#5D54EF',
          500: '#4F46E5',
          600: '#2418E2',
          700: '#1C12B3',
          800: '#140D84',
          900: '#0C0855',
        },
        secondary: {
          DEFAULT: '#818CF8',
          50: '#FFFFFF',
          100: '#F3F4FE',
          200: '#D1D4FC',
          300: '#AFB4FA',
          400: '#8D93F9',
          500: '#818CF8',
          600: '#4F5DF5',
          700: '#1D2EF2',
          800: '#0A1ACD',
          900: '#071396',
        },
      },
    },
  },
  plugins: [],
}