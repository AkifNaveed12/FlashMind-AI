/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#EEF2FF',
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
        },
        success: {
          light: '#ECFDF5',
          DEFAULT: '#10B981',
          dark: '#047857',
        },
        warning: {
          light: '#FFFBEB',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        error: {
          light: '#FEF2F2',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 10px -1px rgba(15, 23, 42, 0.03)',
        'premium': '0 10px 30px -5px rgba(79, 70, 229, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
