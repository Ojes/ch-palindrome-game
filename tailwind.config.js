const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,jsx,js}'],
  theme: {
    fontFamily: {
      default: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: defaultTheme.colors,
    },
  },
  plugins: [],
};
