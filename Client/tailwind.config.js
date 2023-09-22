/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("daisyui"),
    require("@tailwindcss/aspect-ratio"),
  ],
  daisyui: {
    themes: [
      {
        customTheme: {
          primary: "#51A3A3",
          secondary: "#ffdfc5",
          "base-100": "#ffffff",
          accent: "#f3c7ae",
          neutral: "#504136",
        },
      },
    ],
  },
};
