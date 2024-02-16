/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './client/src/**/**/*.{js,jsx,ts,tsx}',
    './client/public/index.html',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

