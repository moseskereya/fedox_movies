/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#222831",
        secondary:"#393e46",
        theme:"#f96d00",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}