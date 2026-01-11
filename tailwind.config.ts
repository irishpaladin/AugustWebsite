import type { Config } from "tailwindcss";
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // Pastel palette
                "pastel-lavender": "#FED7AA", // primary
                "pastel-rose": "#FDE2E4",
                "pastel-peach": "#FFE5D9",
                "pastel-mint": "#D1FAE5",
                "pastel-sky": "#E0F2FE",
                "pastel-butter": "#FEF3C7",
                "pastel-orange": "#FF964F",
                primary: {
                     DEFAULT: "#FB923C", // Tailwind Orange 400 — friendly and bright
    50:  "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FB923C",  // DEFAULT
                }
            },
            borderRadius: {
                '2xl': '1rem'
            },
            boxShadow: {
                soft: "0 10px 25px -8px rgba(17,24,39,.15)"
            }
        }
    },
    plugins: [],
} satisfies Config;