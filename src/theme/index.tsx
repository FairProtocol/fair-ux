import { ThemeOptions, createTheme } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5940c1',
      light: '#b9b0ed',
      dark: '#180b2d',
    },
    secondary: {
      main: '#ffc82e',
      light: '#ffd357',
      dark: '#b28c20',
    },
    warning: {
      main: '#ffc82e',
      light: '#ffd357',
      dark: '#b28c20',
    },
    error: {
      main: '#f04438',
      light: '#f3695f',
      dark: '#a82f27',
    },
    success: {
      main: '#0dd36b',
    },
    divider: '#b9b0eb',
  },
  typography: {
    fontFamily: 'Nunito-Sans-Regular',
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
}

export const theme = createTheme(themeOptions)
