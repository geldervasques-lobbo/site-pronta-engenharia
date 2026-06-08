/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        petroleum: {
          950: "#071f27",
          900: "#0b2f3a",
          800: "#0f3e4c",
          700: "#14566a",
        },
        graphite: {
          950: "#121416",
          900: "#1d2226",
          800: "#2c3338",
        },
        ambercta: "#d9822b",
      },
      boxShadow: {
        industrial: "0 18px 60px rgba(7, 31, 39, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
