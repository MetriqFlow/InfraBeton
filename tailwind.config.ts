import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        navy: {
          DEFAULT: "hsl(var(--navy) / <alpha-value>)",
          deep: "hsl(var(--navy-deep) / <alpha-value>)",
          foreground: "hsl(var(--navy-foreground) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          hover: "hsl(var(--brand-hover) / <alpha-value>)",
          foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
        },
        concrete: "hsl(var(--concrete) / <alpha-value>)",
      },
    },
  },
} satisfies Config;
