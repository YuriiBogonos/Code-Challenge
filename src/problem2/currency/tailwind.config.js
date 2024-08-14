/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#006989",
        "secondary-bg": "#378ca1",
        "border-color": "#8dc2d0",
        "button-bg": "#074e6e",
      },
    },
  },
  plugins: [],
};
