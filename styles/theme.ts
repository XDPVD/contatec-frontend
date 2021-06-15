import { extendTheme } from '@chakra-ui/react'
import { ButtonStyles as Button } from './components/buttonStyles'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBreakpoints } from '@chakra-ui/theme-tools'
const breakpoints = createBreakpoints({
  xs: '200px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px'
})
export const newTheme = extendTheme({
  breakpoints,
  colors: {
    primary: '#EB0029',
    secondary: '#FF6F91',
    highlight: '#00C9A7'
  },
  components: {
    Button
  }
})
