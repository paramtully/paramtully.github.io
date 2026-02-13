/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#2f3e46',
                surface: '#354f52',
                'surface-elevated': '#52796f',
                'text-primary': '#cad2c5',
                'text-secondary': '#84a98c',
                'text-tertiary': '#52796f',
                accent: '#84a98c',
                'accent-hover': '#52796f',
                'accent-secondary': '#52796f',
                border: '#354f52',
                'border-hover': '#52796f',
            },
            fontFamily: {
                sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: true,
    },
}
