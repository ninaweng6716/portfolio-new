/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      colors: {
        tq: {
          DEFAULT: '#20B2A0',
          pale: '#EBF9F7',
          dim: '#178A7B',
          glow: 'rgba(32,178,160,0.18)',
        },
        ink: {
          DEFAULT: '#111210',
          2: '#5C6370',
          3: '#9EA8B0',
        },
        rule: '#E4E8EB',
        bg: '#F7F8F7',
      },
      keyframes: {
        drift: {
          '0%':   { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-30px, 40px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.25' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        drift:  'drift 8s ease-in-out infinite alternate',
        blink:  'blink 2.4s ease-in-out infinite',
        float:  'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
