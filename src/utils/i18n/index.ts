import { createI18n } from 'vue-i18n'
import messages from './locales/index'

export const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	availableLocales: ['es', 'en'],
	globalInjection: true,
	messages: messages,
})

// Usage:
//   - In a component (inside <template>):  $t('hello')
//   - In a ts file or inside <script>:
//        import { i18n } from '@/application/i18n/index'
//        i18n.global.t(TRANSLATION_VAR)
