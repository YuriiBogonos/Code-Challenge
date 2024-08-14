/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#006989",
        "border-color": "#8dc2d0",
        "hover-bg": "#1d8eab",
      },
    },
  },
  plugins: [],
};
