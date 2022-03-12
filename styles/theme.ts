import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#c39a6a'
    }
  }
})

theme = responsiveFontSizes(theme)

export default theme
