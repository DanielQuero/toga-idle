<template lang="pug">
.tabs
  ul.flex.rounded-t-lg
    li.cursor-pointer.rounded-t-lg.border-2.border-b-0.border-black.text-2xs(
      v-for="(tab, index) in tabs"
      :key="index"
      @click="selectTab(index)"
      class="px-1.5 sm:px-3 lg:px-4 xl:px-4.5 2xl:px-6 py-1.5 lg:py-2 xs:text-sm 2xl:text-base"
      :class="tab.selected ? 'bg-section-bg scale-110': 'bg-ui-bg', (index === 0) ? 'origin-left' : '', (index === tabs.length - 1) ? 'ml-auto origin-right' : ''"
    )
      span {{ tab.title }}
      img.w-5(v-if="tab.icon" :src="tab.icon")
  .tab-content
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export interface Tab {
  title: string
  component: string
  selected: boolean
  icon?: string
}

export default defineComponent({
  name: 'Tabs',
  props: {
    tabs: {
      type: Array as () => Tab[],
      required: true
    }
  },
  methods: {
    selectTab(index: number) {
      this.$emit('changeTab', index)
    },
  },
})
</script>
