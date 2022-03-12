module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        almost: 'calc(-50px + 100vh)',
        50: '50px',
        xl: '250px',
        xxl: '300px',
      },
      width: {
        lg: '120px',
        md: '60px',
        sm: '50px',
        80: '80px',
        forty: '40%',
        sixtyplus: '63%',
        ninety: '90%',
        '50%': '50%',
        xl: '250px',
        xxl: '300px',
        500: '500px',
      },
    },
  },
  plugins: [],
}
