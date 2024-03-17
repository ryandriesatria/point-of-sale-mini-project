/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: { gainsboro: "#dcdcdc" },
            fontFamily: {
                impact: "Impact,Haettenschweiler,Arial Narrow Bold,sans-serif",
                franklin:
                    "Franklin Gothic Medium, Arial Narrow, Arial,sans-serif",
                couriernew: "Courier New, Courier, monospace",
                poppins: "Poppins, sans-serif",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
