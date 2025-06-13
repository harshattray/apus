/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
