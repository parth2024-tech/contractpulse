/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        sidebar: '#111111',
        card: '#1a1a1a',
        border: '#2a2a2a',
        'text-primary': '#ffffff',
        'text-secondary': '#888888',
        'text-disabled': '#555555',
        accent: '#6366f1',
        danger: '#ef4444',
        warning: '#f59e0b',
        safe: '#22c55e',
        'hover-row': '#1f1f1f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        button: '6px',
        input: '4px',
      },
    },
  },
  plugins: [],
}
