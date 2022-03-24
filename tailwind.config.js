module.exports = {
    content: ["./src/**/*.{html,js}"],

    theme: {

        colors: {
            "cyan": "hsl(193, 38%, 86%)",
            "green": "hsl(150, 100%, 66%)",
            "blue": {
                100: "hsl(217, 19%, 38%)",
                200: "hsl(217, 19%, 24%)",
                300: "hsl(218, 23%, 16%)"
            }
        },

        extend: {

            fontFamily: {
                "main": ["Manrope", "Arial", "Helvetica", "sans-serif"]
            },

            backgroundImage: {
                "divider-mobile": "url('./images/pattern-divider-mobile.svg')",
                "divider-desktop": "url('./images/pattern-divider-desktop.svg')"
            },

        },

    },

    plugins: [

    ],
}