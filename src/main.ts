import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { vantPlugins } from './plugins/vant.js'

import '@/assets/scss/index.scss'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
vantPlugins.forEach((item) => {
  app.use(item)
})
app.use(pinia)
app.use(router)

app.mount('#app')
