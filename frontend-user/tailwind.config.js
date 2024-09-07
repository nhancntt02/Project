/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        bgheader: {
          100: '#f7fbe9',
          200: '#bdf271',
          300: '#eff5f3'
        }
      }
    },
  },
  plugins: [],
}

