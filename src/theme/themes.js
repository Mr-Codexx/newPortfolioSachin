// theme.js
import { extendTheme } from '@chakra-ui/react';

const createTheme = (skinColor = '#EC1839') => extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: `${skinColor}20`,
      100: `${skinColor}30`,
      500: skinColor,
      600: `${skinColor}CC`,
      700: `${skinColor}DD`,
    }
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "'Poppins', sans-serif",
        lineHeight: 1.5,
        fontSize: "16px",
        bg: props.colorMode === 'dark' ? '#151515' : '#F2F2FC',
        color: props.colorMode === 'dark' ? '#FFFFFF' : '#302E4D',
        transition: 'all 0.3s ease'
      },
      '@keyframes slideInRight': {
        '0%': {
          transform: 'translateX(100%)',
          opacity: 0
        },
        '100%': {
          transform: 'translateX(0)',
          opacity: 1
        }
      },
      '@keyframes slideOutLeft': {
        '0%': {
          transform: 'translateX(0)',
          opacity: 1
        },
        '100%': {
          transform: 'translateX(-100%)',
          opacity: 0
        }
      },
      '@keyframes scaleIn': {
        '0%': {
          transform: 'scale(0.8)',
          opacity: 0
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 1
        }
      }
    })
  },
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1440px',
    '3xl': '1920px'
  }
});

export default createTheme;