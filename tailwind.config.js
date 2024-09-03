/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#D4AF37', // Gold color
          600: '#B38F2D', // Slightly darker gold for hover
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')({
      datatables: true,
    }),
  ],
}

