const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'heroBG' : "url('../public/assets/images/hero-bg.png')",
      },
      screens: {
        xs: { max: "639px" },
        ...defaultTheme.screens,
			},
			colors: {
				coventi: {
					// 50: '#e5e5fb',
					// 100: '#cbccf6',
					// 200: '#b0b3f1',
					// 300: '#939beb',
					// 400: '#7284e6',
					500: '#6083ff',
					// 600: '#a18072',
					// 700: '#977669',
					// 800: '#846358',
					// 900: '#43302b',
				}
			},
    },
  },
  plugins: [],
};
