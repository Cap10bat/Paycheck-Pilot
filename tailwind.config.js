// Tailwind build for Paycheck Pilot. index.html loads the compiled app.css
// (no runtime CDN), so styles work offline in the installed app.
// After changing classes in index.html, rebuild:  npm run build:css
module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
          accent: '#3b82f6',
          dark: '#0b1329',
          card: '#131f37',
          border: '#1e2d4a'
        }
      }
    }
  }
};
