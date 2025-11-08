import type { Config } from "tailwindcss";
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // Pastel palette
                "pastel-lavender": "#E9D8FD", // primary
                "pastel-rose": "#FDE2E4",
                "pastel-peach": "#FFE5D9",
                "pastel-mint": "#D1FAE5",
                "pastel-sky": "#E0F2FE",
                "pastel-butter": "#FEF3C7",
                "orange": "#FF964F",
                primary: {
                    DEFAULT: "#C4B5FD", // lavender 300/400 vibe
                    50: "#F5F3FF",
                    100: "#EDE9FE",
                    200: "#DDD6FE",
                    300: "#C4B5FD",
                    400: "#A78BFA"
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