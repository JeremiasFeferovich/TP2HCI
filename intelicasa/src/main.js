/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(createPinia())

app.mount('#app')
