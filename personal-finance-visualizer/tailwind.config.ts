import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FCEFEA", // Light skin-tone background
        foreground: "#4D2C2C", // Deep brown for contrast
        card: {
          DEFAULT: "#FFAD60", // Warm orange
          foreground: "#4D2C2C", 
        },
        popover: {
          DEFAULT: "#F9DCC5", // Soft peach
          foreground: "#4D2C2C",
        },
        primary: {
          DEFAULT: "#FF7F50", // Coral orange
          foreground: "#FFF5E1", // Soft creamy text
        },
        secondary: {
          DEFAULT: "#F4A261", // Light orange
          foreground: "#4D2C2C",
        },
        muted: {
          DEFAULT: "#F6C177", // Soft warm yellow
          foreground: "#4D2C2C",
        },
        accent: {
          DEFAULT: "#E07A5F", // Rust orange
          foreground: "#FFF",
        },
        destructive: {
          DEFAULT: "#E63946", // Deep red for destructive actions
          foreground: "#FFF",
        },
        border: "#DDBEA9", 
        input: "#F0A07E",
        ring: "#FF4500", // Bright orange ring effect
        chart: {
          "1": "#FFA07A", // Light salmon
          "2": "#E76F51", // Earthy orange
          "3": "#F4A261", // Pastel orange
          "4": "#E9C46A", // Gold-ish
          "5": "#D67D3E", // Burnt orange
        }
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
