/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        display:        ['Syne', 'sans-serif'],
        body:           ['Lato', 'sans-serif'],
        weddingDisplay: ['Cormorant Garamond', 'serif'],
        weddingBody:    ['EB Garamond', 'serif'],
      },
      colors: {
        tq: {
          DEFAULT: '#20B2A0',
          pale:    '#EBF9F7',
          dim:     '#178A7B',
          glow:    'rgba(32,178,160,0.18)',
        },
        ink: {
          DEFAULT: '#111210',
          2:       '#5C6370',
          3:       '#9EA8B0',
        },
        rule: '#E4E8EB',
        bg:   '#F5FFFD',

        weddingPrint: {
          DEFAULT: '#545454',
          light:   '#7a7a7a',
          soft:    '#e8e8e8',
        },

        weddingPink: {
          DEFAULT: '#c2a2b3',
          light:   '#e3d2db',
          soft:    '#f4ecf0',
        },

        weddingTq: {
          DEFAULT: '#9dbec0',
          light:   '#cfe2e3',
          soft:    '#eef6f6',
        },

        weddingDark: {
          DEFAULT: '#0d4e5d',
          light:   '#2e6e7b',
          soft:    '#dbeaec',
        },
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
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        drift:   'drift 8s ease-in-out infinite alternate',
        blink:   'blink 2.4s ease-in-out infinite',
        float:   'float 3s ease-in-out infinite',
        fadeIn:  'fadeIn 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}