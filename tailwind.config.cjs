/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: theme => ({
                'main-bg': "url('/src/assets/pictures/bg.webp')",
            }),
            height: {
                'screen-custom': 'calc(var(--vh, 1vh) * 100)',
            },
        },
    },
    plugins: [],
}

