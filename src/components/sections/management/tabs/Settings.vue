<template lang="pug">
.settings.text-md(class="lg:text-lg")
  .actions-list.flex.justify-center.items-center.flex-wrap.pt-2(class="lg:pt-6")
    .m-2.text-center.flex.flex-col.items-center
      .my-4
        h2.text-lg.mb-2.font-bold(class="lg:text-2xl") {{ $t('settings.language') }}:
        button(v-for="lang in languages" :key="lang.code" :lang="lang.code" @click="changeSelectedLang(lang.code)")
          img.w-16.mx-2(:class="{'opacity-50': selectedLang != lang.code}" :src="lang.src" :alt="`${lang.name} ${$t('settings.flag')}`")
      .my-4(class="lg:mt-8 2xl:mt-12")
        h2.text-lg.font-bold.mb-2(class="lg:text-2xl") {{ $t('settings.credits') }}:
        .mb-1(class="lg:mb-2 2xl:mb-4")
          .font-bold.mr-1 {{ $t('settings.developer') }}
          .cursor-pointer.transform.transition.duration-300(class="hover:text-blue-700")
            a(href="https://danielquero.github.io/" target="_blank") Daniel Quero
        .mb-1(class="lg:mb-2 2xl:mb-4")
          .font-bold.mr-1 {{ $t('settings.artist') }}
          .cursor-pointer.transform.transition.duration-300(class="hover:text-blue-700")
            a(href="https://www.artstation.com/liandra" target="_blank") Marta Ortiz
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { i18n } from '@/utils/i18n'

export default defineComponent({
	data() {
		return {
			languages: [
				{ code: 'es', name: 'Spain', src: new URL('/images/flags/spain-circle.svg', import.meta.url).href },
				{ code: 'en', name: 'UK', src: new URL('/images/flags/uk-circle.svg', import.meta.url).href },
			],
		}
	},
	computed: {
		selectedLang() {
			return i18n.global.locale
		},
	},
	methods: {
		changeSelectedLang(langCode: string) {
			i18n.global.locale = langCode
		},
	},
})
</script>
