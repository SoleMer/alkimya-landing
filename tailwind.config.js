/**
 * Paleta extraída por muestreo de píxeles de los logos de Alkimya Labs y GastON.
 * Cargada desde src/styles.css mediante la directiva `@config` de Tailwind v4.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Violeta de marca. 400 = trazo neón de Alkimya Labs, 800 = violeta profundo de GastON.
        primary: {
          50: '#f4f1fd',
          100: '#e9e3fb',
          200: '#d4c8f6',
          300: '#bba9f0',
          400: '#a68fe8',
          500: '#8a6fd9',
          600: '#6d52c0',
          700: '#5540a0',
          800: '#402c82',
          900: '#2e1e65',
          950: '#16064f',
          DEFAULT: '#402c82',
        },
        // Verde menta / esmeralda. 400 = neón de Alkimya Labs, 500 = verde de GastON (WhatsApp / finanzas).
        accent: {
          50: '#e8fdf5',
          100: '#c6fae6',
          200: '#91f3d0',
          300: '#5aebbb',
          400: '#29e3a7',
          500: '#12bc82',
          600: '#0b9a6a',
          700: '#0a7a56',
          800: '#0b6046',
          900: '#0a4f3b',
          950: '#032c20',
          DEFAULT: '#12bc82',
        },
        // Superficies grafito. 950 = fondo exacto del logo de Alkimya Labs.
        graphite: {
          50: '#f7f8fa',
          100: '#eceef3',
          200: '#d7d9e1',
          300: '#b4b8c6',
          400: '#8a90a3',
          500: '#5a6178',
          600: '#3a4157',
          700: '#262c40',
          800: '#1a1f30',
          900: '#121624',
          950: '#0c0f18',
          DEFAULT: '#0c0f18',
        },
      },
      fontFamily: {
        display: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
};
