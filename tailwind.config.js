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
        heading: ["Roboto", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        cta: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}