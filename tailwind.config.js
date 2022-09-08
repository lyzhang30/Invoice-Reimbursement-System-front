/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        p5: "5%",
        p15: "15%",
        p10: "10%",
        p20: "20%",
        p30: "30%",
        p40: "40%",
        p50: "50%",
        p60: "60%",
      },
    },
  },
  plugins: [],
};
