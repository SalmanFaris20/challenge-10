module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        utama: ["Poppins"],
      },
      colors: {
        utama: "#151521",
        second: "#6a30fa",
        emas: "#d9a247",
        pink: "#F91550",
        login: "#dc2249",
        ungu: "#412B43",
      },
    },
  },
  plugins: [require("daisyui")],
};
