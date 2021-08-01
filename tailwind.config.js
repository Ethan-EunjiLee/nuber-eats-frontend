// * tailwind를 확장해서 사용하기 위해 설정 필요

const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // * theme - extend 내부에 확장할 내용을 적어준다.
      colors: {
        lime: colors.lime,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
