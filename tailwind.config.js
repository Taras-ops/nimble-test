/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0992a5',
        secondary: '#d0e1ed',
        danger: '#cc080e',
      },
    },
  },
  plugins: [],
};
