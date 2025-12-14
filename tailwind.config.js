const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      inherit: 'inherit',
      black: '#000000',
      white: '#FFFFFF',
      rose: '#FF9091',
      purple: '#B075FF',
      teal: '#167279',
      gray: '#B1B1B1',
      lightGray: '#EBEBEB',
      midGray: '#D6D6D6',
      darkGray: '#808080',
      offWhite: '#F2F2F2',
      pink: '#fc63a3',
      red: '#ff2f16',
      brightYellow: '#ffc813',
      yellow: '#febc2c',
      dullYellow: '#FEC733',
      blue: '#0f32c9',
      beige: '#F0EAE4',
      navy: '#1a243b',
      lime: '#2dfd66',
      facebook: '#3b5998',
      seenOrange: '#FD8141',
      lumenOrange: '#FF9008',
      lumenBlue: '#29EEFA',
      lumenPink: '#FF9EC2',
      lumenYellow: '#FFDE03',
      lumenGreen: '#00E010',
      bsf11Teal: '#17FFDF',
      bsf11Purple: '#554FF0',
      bsf11Yellow: '#FFFF00',
      seenDreams: '#CEA1D8',
      bsf12Bg: '#ebe8e2',
      bsf12green: '#00ef9d',
      bsf12blue: '#72f5ff',
      bsf12yellow: '#e7ef5a',
      darkRed: '#6C1C15',
      bsf13green: '#C4FFE8',
      bsf13purple: '#D4CAFF',
      bsf13orange: '#FF6222',
      seen7: '#6BCAD6',
      bsf14yellow: '#FFEA80',
      bsf14yellowTint: '#F4AE00',
      bsf14pink: '#FED4E2',
      bsf14pinkTint: '#FF85BC',
      bsf14orange: '#FF5900',
      bsf14orangeTint: '#ffc086',
      bsf14cherry: '#E51000',
      bsf14cherryTint: '#ffa099'
    },
    fontFamily: {
      sans: ['Matter', 'sans-serif'],
      serif: ['Triptych', 'serif'],
      serif_italic: ['TriptychItalic', 'serif'],
      serif_iranic: ['PanamaIranic', 'serif'],
      serif_italic_alt: ['PanamaItalic', 'serif'],
      serif_bold: ['PanamaBold', 'serif'],
      festival_sans: ['OstiaAntica', 'sans-serif'],
      festival_sans_italic: ['OstiaAnticaItalic', 'sans-serif'],
      festival_sans_light_italic: ['OstiaAnticaItalicLight', 'sans-serif'],
      seen_serif: ['BradfordLLWeb-Regular', 'serif'],
      seen_serif_italic: ['BradfordLLWeb-Italic', 'serif'],
      seen_serif_light: ['BradfordLLWeb-Light', 'serif'],
      seen_serif_light_italic: ['BradfordLLWeb-LightItalic', 'serif'],
      seen_dreams: ['Gallique Light', 'serif'],
      bsf11_sans: ['FK Screamer', 'sans-serif'],
      bsf11_cursive: ['Blitz', 'cursive'],
      bsf14_cursive: ['Tiny', 'cursive']

    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      md: '6px',
      lg: '10px',
      xl: '15px'
    },
    fontSize: {
      ...defaultTheme.fontSize,
      '7.5xl': '6rem',
      '8xl': '8rem'
    },
    lineHeight: {
      ...defaultTheme.lineHeight,
      overlap: 0.8
    },
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      '4xl': '3rem',
      full: '9999px'
    },
    extend: {
      padding: {
        '27': '6.75rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
      },
      width: {
        '1/13': '7.692%'
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2000px'
      },
      maxWidth: {
        '10xl': '120rem'
      },
      inset: {
        '-border-4': '-4px',
        '-border-md': '-6px',
        '-border-lg': '-10px'
      },
      margin: {
        '-border-3': '-3px',
        '-border-4': '-4px',
        '-border-md': '-6px',
        '-border-lg': '-10px',
        'border': '5px',
        '-border': '-5px'
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
        marquee: 'marquee 6s linear infinite',
        'color-cycle': 'colorCycle 10s linear infinite',
        'color-cycle-festival': 'colorCycleFestival 15s linear infinite',
        'color-cycle-bsf11': 'colorCycleBSF11 15s linear infinite',
        bounceLg: 'bounceLg 1s linear infinite',
        bounceLgAlt: 'bounceLg 2s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        colorCycle: {
          '0%': { background: '#FFFFFF' },
          '25%': { background: '#FF9091' },
          '50%': { background: '#B075FF' },
          '75%': { background: '#167279' },
          '100%': { background: '#FFFFFF' }
        },
        colorCycleFestival: {
          '0%': { background: '#FFFFFF' },
          '15%': { background: '#fc63a3' },
          '30%': { background: '#febc2c' },
          '45%': { background: '#0f32c9' },
          '60%': { background: '#ff2f16' },
          '75%': { background: '#2dfd66' },
          '100%': { background: '#FFFFFF' }
        },
        colorCycleBSF11: {
          '0%': { background: '#FFFFFF' },
          '25%': { background: '#17FFDF' },
          '50%': { background: '#554FF0' },
          '75%': { background: '#FFFF00' },
          '100%': { background: '#FFFFFF' }
        },
        bounceLg: {
          '0%, 100%': {
            transform: 'translateY(-100%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        }
      },
      lineHeight: {
        bsf13: '0.85',
        bsf13alt: '0.9'
      },
      letterSpacing: {
        bsf13: '2px'
      }
    }
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    transform: ['responsive', 'motion-safe', 'motion-reduce'],
    opacity: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
  safelist: [
    'bg-bsf14yellowTint',
    'bg-bsf14cherry',
    'bg-bsf14cherryTint',
    'bg-bsf14orange',
    'bg-bsf14orangeTint',
    'bg-bsf14pink',
    'bg-bsf14pinkTint',
    'bg-bsf14yellow',
    'bg-bsf13green',
    'text-bsf14yellowTint',
    'text-bsf14cherry',
    'text-bsf14cherryTint',
    'text-bsf14orange',
    'text-bsf14orangeTint',
    'text-bsf14pink',
    'text-bsf14pinkTint',
    'text-bsf14yellow',
    'lg:bg-bsf14yellowTint',
    'lg:bg-bsf14cherry',
    'lg:bg-bsf14cherryTint',
    'lg:bg-bsf14orange',
    'lg:bg-bsf14orangeTint',
    'lg:bg-bsf14pink',
    'lg:bg-bsf14pinkTint',
    'lg:bg-bsf14yellow',
    'lg:bg-offWhite',
    'from-bsf14yellowTint',
    'from-bsf14cherry',
    'from-bsf14cherryTint',
    'from-bsf14orange',
    'from-bsf14orangeTint',
    'from-bsf14pink',
    'from-bsf14pinkTint',
    'from-bsf14yellow',
    'to-bsf14yellowTint',
    'to-bsf14cherry',
    'to-bsf14cherryTint',
    'to-bsf14orange',
    'to-bsf14orangeTint',
    'to-bsf14pink',
    'to-bsf14pinkTint',
    'to-bsf14yellow',
    'bg-midGray'
  ]
}
