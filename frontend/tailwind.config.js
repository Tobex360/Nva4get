/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pri: '#0D4715',
        sec: '#EBE1D1',
        tet: '#E9762B',
      },
    },
  },
  plugins: [],
}

