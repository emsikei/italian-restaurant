/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                // sans: ['"Open Sans"', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                vp_body: '#EBE4DB',
                vp_brown: {
                    100: '#CBA16D',
                    200: '#B88341',
                },
                vp_gray: '#4A4A4C',
            },
            screens: {
                xs: '440px',
            },
        },
    },
    plugins: [],
};
