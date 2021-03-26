module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      80: 80,
      100: 100,
      800: 800,
      900: 900,
      999: 999,
      auto: "auto",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
