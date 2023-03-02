/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "gold": "#E8C47C",
      "dark-blue": "#111827",
      "dark-blue-200": "#404652",
      "white": "#FFF",
      "sky-blue": "#3E98C7",
      "transparent": "transparent",
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
