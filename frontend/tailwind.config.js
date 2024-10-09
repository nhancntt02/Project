/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        bgheader: {
          100: '#89cff0',
          200: '#dddddd',
          300: '#555555',
          400: '#EEEEEE'
        }
      }
    },
  },
  plugins: [],
}

