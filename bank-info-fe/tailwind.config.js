/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "className",
  theme: {
    extend: {
      colors: {
        primary: "#215c5f",
        "accent-orange": "#FE7F2D",
        "background-light": "#f6f8f8",
        "background-dark": "#141d1e",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
