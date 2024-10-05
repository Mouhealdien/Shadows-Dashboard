/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c62229",
        secondary: "#ffffff",
        third: "#d9d9d9",
        fourth: "rgba(25,59,104)",
      },
    },
  },
  plugins: [],
};
