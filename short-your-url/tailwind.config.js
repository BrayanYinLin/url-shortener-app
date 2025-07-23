/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        pattern: "url(/background.webp)",
        "low-opacity-pattern": "url(/background-low-opacity.webp)"
      },
      colors: {
        'black-hue': '#222C34',
        'white-hue': '#FEFEFE',
        'shadow-blue': 'hsl(220, 100%, 80%)'
      },
      keyframes: {
        minimize: {
          '0%': { transform: 'scale(1)'},
          '100%': { transform: 'scale(0)' }
        },
        maximize: {
          '0%': { transform: 'scale(0)'},
          '100%': { transform: 'scale(1)' }
        },
        appear: {
          '0%': { transform: 'translateY(100vh)' },
          '100%': { transform: 'translateY(10px)' }
        },
        disappear: {
          '0%': { transform: 'translateY(8px)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      animation: {
        minimize: 'minimize 0.3s ease',
        maximize: 'maximize 0.3s ease',
        appear: 'appear 0.5s ease',
        disappear: 'disappear 0.5s ease'
      },
      screens: {
        xs: '425px',
        tablet: '700px'
      }
    },
  },
  plugins: [],
}
