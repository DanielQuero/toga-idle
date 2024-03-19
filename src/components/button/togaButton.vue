<template lang="pug">
button.flex.items-center.justify-center.text-white.font-bold.py-2.px-3.rounded.bg-ui-bg.border-b-8.border-ui-bg-dark.w-40(
  class="md:w-w-32"
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
  },
})
</script>
