import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', flowbite.content(),],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
