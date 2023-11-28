/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "blue-800": "#212242",
      "blue-700": "#252a4a",
      "blue-600": "#2c325b",
      "blue-500": "#383A70",
      "gray-100": "#E7E7E7",
      "gray-500": "#5c5f7a",
      "gray-300": "#aaacbb",
      "white": "#fff",
      "purple": "#823ef1",
      "blue": "#3274f5",
      "green": "#4fe6e4",
      "pink": "#ed3a98",
      "yellow": "#f79211",
    },
  },
  plugins: [],
};
