/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   extend: {
      colors: {
        'black-100': '#1b162b',
        'black-200': '#191525',
        'black-300': '#110e1b',
        'black-400': '#0d082c',
        'blue-100': '#4629f2',
        'blue-200': '#1d1748',
        'blue-300': '#0d082c',
        'white-100': '#f3f3f3',
        'white-200': '#ededed',
        'white-300': '#6d7096',
        'white-400': '#e3e3e3',
        'white-500': 'rgba(177, 227, 242, 0.2)'
      },
      boxShadow: {
        'xl': '0px 5px 10px 0px rgba(0, 0, 0, 0.2)',
      },
      screens: {
        's': '350px',

        'sm': '550px',

        'md': '700px',

        'lg': '850px',

        'xl': '1000px',

        '2xl': '1200px',
      }
    },
  },
  plugins: [],
}

