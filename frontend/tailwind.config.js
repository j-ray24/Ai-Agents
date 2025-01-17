/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Indigo-500
          light: '#818cf8',   // Indigo-400
          dark: '#4f46e5',    // Indigo-600
        },
        violet: {
          500: '#8b5cf6',
        },
        indigo: {
          400: '#818cf8',
        }
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#6366f1",
          "primary-focus": "#4f46e5",
        },
      },
    ],
  },
}
