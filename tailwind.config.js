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
        p90: "90%",
        98: "26rem",
        100: "28rem",
        105: "30rem",
        107: "31rem",
        110: "32rem",
        115: "34rem",
        120: "36rem",
        125: "38rem",
        128: "39rem",
        130: "40rem",
      },
      width: {
        98: "26rem",
        100: "28rem",
        105: "30rem",
        107: "31rem",
        110: "32rem",
        115: "34rem",
        120: "36rem",
        125: "38rem",
        128: "39rem",
        130: "40rem",
      },
      blur: {
        xs: "2px",
        xxs: "1.5px",
        xxxs: "1px",
        ss: "0.5px",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
