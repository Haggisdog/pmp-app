// File: tailwind.config.js

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['"Press Start 2P"', 'monospace'],
        arial: ['Arial', 'sans-serif'],
        times: ['"Times New Roman"', 'serif'],
        courier: ['"Courier New"', 'monospace'],
        georgia: ['Georgia', 'serif']
      },
      animation: {
        'pmp-walk': 'walk 8s linear forwards',
        'pulse-answered': 'pulseAnswered 1s ease-in-out 1',
        'pulse-incorrect': 'pulseIncorrect 1s ease-in-out 1',
        'pulse-skipped': 'pulseSkipped 1s ease-in-out 1'
      },
      keyframes: {
        walk: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        pulseAnswered: {
          '0%': { transform: 'scale(1)', backgroundColor: '#bbf7d0' },
          '50%': { transform: 'scale(1.1)', backgroundColor: '#4ade80' },
          '100%': { transform: 'scale(1)', backgroundColor: '#22c55e' }
        },
        pulseIncorrect: {
          '0%': { transform: 'scale(1)', backgroundColor: '#fecaca' },
          '50%': { transform: 'scale(1.1)', backgroundColor: '#f87171' },
          '100%': { transform: 'scale(1)', backgroundColor: '#ef4444' }
        },
        pulseSkipped: {
          '0%': { transform: 'scale(1)', backgroundColor: '#fde68a' },
          '50%': { transform: 'scale(1.1)', backgroundColor: '#fbbf24' },
          '100%': { transform: 'scale(1)', backgroundColor: '#f59e0b' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    // Font utility classes
    "font-arcade",
    "font-arial",
    "font-times",
    "font-courier",
    "font-georgia",

    // Color utility classes used dynamically
    "text-green-600",
    "text-red-600",
    "bg-green-600",
    "bg-green-700",
    "bg-blue-600",
    "bg-blue-700",
    "text-yellow-800",
    "bg-yellow-100"
  ],
};
