<template lang="pug">
.settings
  .actions-list.flex.justify-center.items-center.flex-wrap.pt-2(class="lg:pt-6")
    .m-2.text-center.flex.flex-col.items-center
      .my-2
        .mb-2 {{ $t('settings.language') }}:
        button(v-for="lang in languages" :key="lang.code" :lang="lang.code" @click="changeSelectedLang(lang.code)")
          img.w-16.mx-2(:class="{'opacity-50': selectedLang != lang.code}" :src="lang.src" :alt="`${lang.name} ${$t('settings.flag')}`")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@/models/Game'
import { i18n } from '@/utils/i18n'

export default defineComponent({
  props: {
    game: {
      type: Game,
      required: true
    }
  },
  data() {
    return {
      languages: [
        { code: 'es', name: 'Spain', src: new URL('/images/flags/spain-circle.svg', import.meta.url).href },
        { code: 'en', name: 'UK', src: new URL('/images/flags/uk-circle.svg', import.meta.url).href }
      ]
    }
  },
  computed: {
    selectedLang() {
      return i18n.global.locale
    }
  },
  methods: {
    changeSelectedLang(langCode: string) {
      i18n.global.locale = langCode
    }
  },
})
</script>
