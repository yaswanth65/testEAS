/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#C4C4C4",
          100: "#A8A8A8",
          200: "#8C8C8C",
          300: "#707070",
          400: "#545454",
          500: "#383838",
          600: "#2A2A2A",
          700: "#1E1E1E",
          800: "#121212",
          900: "#0A0A0A",
          950: "#050505",
        },
        accent: {
          50: "#E0F2FE",
          100: "#BAE6FD",
          200: "#7DD3FC",
          300: "#38BDF8",
          400: "#0EA5E9",
          500: "#0284C7",
          600: "#0369A1",
          700: "#075985",
          800: "#0C4A6E",
          900: "#082F49",
        },
      },
    },
  },
};
