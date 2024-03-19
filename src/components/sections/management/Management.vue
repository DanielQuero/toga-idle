<template lang="pug">
.flex.flex-col
  tabs(:value="tabs" @changeTab="changeTab")
  .bg-section-bg.flex-auto.border-2.border-black.rounded-b-lg.rounded-tr-lg
    component(
      v-if="activeTabComponent"
      :is="activeTabComponent"
      :game="game"
    )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tabs from '@/components/tabs/tabs.vue'
import Actions from './tabs/Actions.vue'
import Buildings from './tabs/Buildings.vue'
import { Game } from '@/models/Game'

export default defineComponent({
  components: {
    Tabs,
    Actions,
    Buildings
  },
  props: {
    game: {
      type: Game,
      required: true
    },
  },
  data() {
    return {
      tabs: [
        { title: 'Actions', component: 'Actions', selected: true },
        { title: 'Buildings', component: 'Buildings', selected: false }
      ],
    };
  },
  computed: {
    activeTabComponent(): string {
      return this.tabs.find((tab) => {
        return tab.selected
      })?.component || ''
    },
  },
});
</script>
