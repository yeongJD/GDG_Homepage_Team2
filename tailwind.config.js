/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Key Colors (Brand)
        brand: {
          blue: '#5CA0FF',
          green: '#94F0A1',
          yellow: '#FFE879',
          pink: '#FF9EC7',
          red: '#FF9C9C',
        },

        // Greyscale Colors
        grey: {
          12: '#2F2F2F',
          11: '#363636',
          10: '#4B4B4B',
          9: '#595959',
          8: '#696969',
          7: '#6D6D6D',
          6: '#707070',
          5: '#7B7B7B',
          4: '#9F9F9F',
          3: '#B2B2B2',
          2: '#D8D8D8',
          1: '#F3F3F3',
        },

        // Foundation Colors - Blue
        blue: {
          b0: '#DBE7FF',
          b1: '#F0F3F8',
          b2: '#DCE1EB',
          b3: '#6BA9DD',
          b4: '#A6DEFF',
          b5: '#4774FF',
          b6: '#3DB7DC',
          b7: '#0C24AD',
          b8: '#0B7041',
          b9: '#1B1D29',
          b10: '#020919',
        },

        // Foundation Colors - Green
        green: {
          g1: '#DCFFC3',
          g2: '#3DDB4F',
          g3: '#30B941',
        },

        // Foundation Colors - Yellow
        yellow: {
          y1: '#FFF4C2',
          y3: '#F0D620',
        },

        // Foundation Colors - Red
        red: {
          r1: '#FFD7D7',
          r3: '#FD6767',
        },

        // Foundation Colors - Pink
        pink: {
          p1: '#FFD5E7',
          p3: '#EE82B1',
        },

        // Error Color
        error: '#FF7171',

        // Category Exclusion Colors
        exclusion: {
          yg1: '#D2D2D2',
          yg2: '#A6A6A6',
          white: '#FFFFFF',
        },

        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        // Title
        'title-bold': ['100px', { lineHeight: '120px', fontWeight: '700' }],
        'title-semibold-1': ['60px', { lineHeight: '72px', fontWeight: '600' }],
        'title-medium': ['40px', { lineHeight: '48px', fontWeight: '500' }],
        'title-semibold-2': ['40px', { lineHeight: '56px', fontWeight: '600' }],

        // title (lowercase)
        'title-semibold': ['60px', { lineHeight: '72px', fontWeight: '600' }],

        // Body
        'body-semibold-1': ['30px', { lineHeight: '42px', fontWeight: '600' }],
        'body-medium-1': ['26px', { lineHeight: '36px', fontWeight: '500' }],
        'body-medium-2': ['22px', { lineHeight: '30px', fontWeight: '500' }],
        'body-semibold-2': ['22px', { lineHeight: '30px', fontWeight: '600' }],
        'body-semibold-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],

        // body (lowercase)
        'body-semibold': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-medium': ['20px', { lineHeight: '28px', fontWeight: '500' }],
        'body-bold': ['20px', { lineHeight: '28px', fontWeight: '700' }],

        // caption
        'caption-medium': ['16px', { lineHeight: '22px', fontWeight: '500' }],

        // capion (typo in original)
        'capion-medium': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
