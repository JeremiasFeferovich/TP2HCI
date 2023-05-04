/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

const color = 'blue';

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: colors[color].lighten5,
    surface: colors.shades.white,
    primary: colors[color].darken2,
    'primary-darken-1': colors[color].darken4,
    secondary: colors[color].lighten3,
    'secondary-darken-1': '#018786',
    tertiary: colors.red.lighten3,
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default createVuetify({
  theme: {
    options: {
      customProperties: true,
    },
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  }
})