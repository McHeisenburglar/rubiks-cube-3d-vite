/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Inter', 'Helvetica', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {},
	},
	safelist: [
		'text-slate-800',
		'text-green-600',
		'text-yellow-600',
		'text-red-700',
	],
	plugins: [],
}
