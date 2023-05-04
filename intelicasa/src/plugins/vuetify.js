/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'


const myCustomLightTheme = {
  dark: false,
  colors: {
    background: colors.blue.lighten5,
    surface: colors.shades.white,
    primary: colors.blue.darken2,
    'primary-darken-1': colors.blue.darken4,
    secondary: colors.blue.lighten3,
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

/*
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
*/