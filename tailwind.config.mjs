/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#D62828", // Replace with the exact hex code from your favicon
        "custom-green": "#2F8F20", // Replace with the exact hex code from your favicon
        "custom-gold": "#F5CB5C", // Replace with the exact hex code from your favicon
      },
    },
  },
  plugins: [],
};
