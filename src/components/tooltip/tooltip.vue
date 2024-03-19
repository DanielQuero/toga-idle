<template lang="pug">
.relative(@mouseover="show" @mouseleave="hide")
  slot
  .tooltip.absolute.z-10.px-2.py-1.text-white.bg-gray-800.rounded-md.shadow-md.text-sm(v-if="showTooltip")
    .text {{ text }}
    .extra-text.mt-3
      slot(name="extraSlot")
    span.absolute.w-4.h-4.bg-gray-800.transform.rotate-45.-top-2(class="right-1/2")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tooltip',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showTooltip: false
    };
  },
  methods: {
    show() {
      this.showTooltip = true;
    },
    hide() {
      this.showTooltip = false;
    }
  }
});
</script>
