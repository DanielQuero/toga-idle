<template lang="pug">
.tabs
  ul.flex.rounded-t-lg
    li.px-8.py-2.w-36.cursor-pointer.rounded-t-lg.border-2.border-b-0.border-black.origin-left(
      v-for="(tab, index) in value"
      :key="index"
      @click="selectTab(index)"
      :class="tab.selected ? 'bg-section-bg scale-110': 'bg-ui-bg'"
    ) {{ tab.title }}
  .tab-content
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Tab {
  title: string
  component: string
  selected: boolean
}

export default defineComponent({
  name: 'Tabs',
  props: {
    value: {
      type: Array as () => Tab[],
      required: true
    }
  },
  methods: {
    selectTab(index: number) {
      this.cleanPreviousSelectedTab()
      this.value[index].selected = true
    },
    cleanPreviousSelectedTab() {
      this.value.forEach((tab) => {
        tab.selected = false
      })
    }
  },
})
</script>
