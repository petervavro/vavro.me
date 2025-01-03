/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        neutral: {
          light: "hsl(214deg 10% 33%)",
          DEFAULT: "#343a40",
        },
        primary: {
          light: "#67e8f9",
          DEFAULT: "#81c6dd",
          dark: "#6fbdd8",
        },
        secondary: {
          DEFAULT: "#e9b64d",
          dark: "#cc9119",
        },
        tertiary: "hsl(102deg 44% 70%)",
      },
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
        serif: ["Staatliches", "serif"],
      },
    },
    listStyleType: {
      none: "none",
      square: "square",
    },
  },
  plugins: [],
};
