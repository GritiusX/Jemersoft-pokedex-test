/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        xs2: '376px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        lg2: '1100px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },
  plugins: []
}
