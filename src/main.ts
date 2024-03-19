import './assets/main.sass'

import { i18n } from './utils/i18n/index'

import { createApp } from 'vue'
import App from './App.vue'

import togaButton from './components/button/togaButton.vue'
import sectionTitle from './components/sectionTitle/sectionTitle.vue'
import tooltip from './components/tooltip/tooltip.vue'
import cost from './components/cost/cost.vue'

createApp(App)
	.use(i18n)
	.component('SectionTitle', sectionTitle)
	.component('TogaButton', togaButton)
	.component('Tooltip', tooltip)
	.component('Cost', cost)
	.mount('#app')
