module.exports = {
  content: [ "./public/index.html",
  "./src/**/*.{js,jsx,ts,tsx}"],

  mode: 'jit',
  darkmode: false,
  theme: {
    extend: {
      colors: {
        'primary-black': '#eab308',
        'secondary-white': '#c7c7c7',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
    },
  },
  plugins: [],
};
