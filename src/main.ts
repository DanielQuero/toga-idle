import './assets/main.sass'

import { i18n } from './utils/i18n/index'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(i18n).mount('#app')
