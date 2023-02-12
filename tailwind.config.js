/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'primary-100': ['Inter-Thin'],
        'primary-200': ['Inter-ExtraLight'],
        'primary-300': ['Inter-Light'],
        'primary-400': ['Inter-Regular'],
        'primary-500': ['Inter-Medium'],
        'primary-600': ['Inter-SemiBold'],
        'primary-700': ['Inter-Bold'],
        'primary-800': ['Inter-ExtraBold'],
        'primary-900': ['Inter-Black'],
      },
    },
  },
  plugins: [],
};
