/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#d93010", // Replace with the exact hex code from your favicon
        "custom-green": "#52645c", // Replace with the exact hex code from your favicon
        "sand": "#f9f2db", // Replace with the exact hex code from your favicon
        "pinkish": "#FEE2E2",
      },
    },
  },
  plugins: [],
};
