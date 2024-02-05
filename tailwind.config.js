/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      listStyleImage: {
        greencheckmark: 'url("https://i.ibb.co/jHt7pJm/image.png")',
      },
},
    colors: {
      default: '#db2471',
      error: '#db2471',
      success: '#057a55'
    }
  },
  plugins: [
      require('flowbite/plugin'),
  ]
}
