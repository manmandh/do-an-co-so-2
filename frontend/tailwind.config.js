/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				pri: '#f03248',
				'light-white': '#ccc',
				gray: '#6c757d',
				success: '#28a745',
				warning: '#ffc107',
				info: '#17a2b8',
				'text-gray': '#979c9e',
				'gray-dark': '#343a40',
			},
			fontSize: {
				xs: '1.2rem',
				base: '1.6rem',
				sm: '1.4rem',
				md: '1.8rem',
				lg: '2rem',
				xl: '2.2rem',
				xxl: '2.4rem',
				'2xl': '2.6rem',
			},
			aspectRatio: {
				'2/3': '2 / 3',
			},
		},
	},
	plugins: [],
}
