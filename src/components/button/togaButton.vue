<template lang="pug">
button.flex.items-center.justify-center.text-white.py-1.px-1.rounded.bg-ui-bg.border-b-8.border-ui-bg-dark.w-24.text-xs(
  v-wave="waveEffect"
  class="md:w-32 xl:w-36 xl:py-2 md:px-3 md:font-bold xs:text-sm 2xl:text-base"
  :class="disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-ui-bg-dark'"
)
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TogaButton',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    withMargin: {
      type: Boolean,
      required: false,
      default: false
    },
    waveEffect: {
      type: Boolean,
      required: false,
      default: false
    },
  },
})
</script>
