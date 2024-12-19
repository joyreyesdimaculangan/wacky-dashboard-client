module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#D4AF37',
          600: '#B38F2D',
        }
      },
      screens: {
        'xs': '480px',  // Extra small devices (optional)
        'sm': '640px',  // Small devices
        'md': '768px',  // Medium devices
        'lg': '1024px', // Large devices
        'xl': '1280px', // Extra-large devices
        '2xl': '1536px', // Larger screens (optional)
      },
      spacing: {
        '128': '32rem',  // Custom spacing
        '144': '36rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')({
      datatables: true,
    }),
  ],
}
