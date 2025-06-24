/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "loading-ring": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "loading-ring":
          "loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
      },
    },
  },
  plugins: [],
};
