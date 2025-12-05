import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "ring-offset-background": "hsl(var(--ring-offset-background))",
        "muted-foreground": "hsl(var(--muted-foreground))",
      },
    },
  },
  plugins: [],
};

export default config;
