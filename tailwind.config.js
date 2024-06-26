/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        option:'0 0px 1px .5px #22c55e, 0 0px 1px .5px #22c55e, 0 0px 1px .5px #22c55e, 0 0px 1px .5px #22c55e'
      },
      fontFamily:{
        montserrat:["Poppins", "sans-serif"]
      },
      colors: {
        customBlue: '#92C7CF',
      }
    },
  },
  plugins: [],
}