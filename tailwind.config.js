/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'source-code': ['"Source Code Pro"', 'monospace']
      },
       backgroundImage: (theme) => ({
        artemis: "url('https://images-assets.nasa.gov/image/MAF_20220826_MAF_KSC_Artemis1_epb_020/MAF_20220826_MAF_KSC_Artemis1_epb_020~medium.jpg')",
      }),
    },
  },
  plugins: [],
};
