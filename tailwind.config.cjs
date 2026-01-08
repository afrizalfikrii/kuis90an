/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "retro-pink": "#ff7eb6",
        "retro-cyan": "#7ee787",
        "retro-yellow": "#fff475",
        "retro-purple": "#d2a8ff",
        "retro-bg": "#fdfbf7",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        retro: ['"VT323"', "monospace"],
      },
      animation: {
        glitch: "glitch 1s linear infinite",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
        },
      },
    },
  },
  plugins: [],
};
