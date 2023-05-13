module.exports = {
  content: [ "./public/index.html",
  "./src/**/*.{js,jsx,ts,tsx}"],

  mode: 'jit',
  darkmode: false,
   screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
    },
    
  theme: {
    extend: {
      colors: {
        'primary-black': '#eab308',
        'secondary-white': '#334155',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
    },
  },
  plugins: [],
};
