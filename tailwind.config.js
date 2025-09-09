/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // insert fonts
      },
    },
  },
  plugins: [],
}