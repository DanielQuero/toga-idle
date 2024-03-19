<template lang="pug">
.grid.grid-cols-1.border-black.border-2.p-1.rounded-lg.bg-ui-bg-dark(class="md:h-[55vh] md:grid-cols-9 md:gap-1")
  resources.col-span-2.bg-section-bg.border-2.border-black.rounded-lg(:game="game")
  management.col-span-4.my-2(class="md:my-0" :game="game")
  village-map.col-span-3.border-2.border-black.rounded-lg.col-span-1.min-h-80(:game="game")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from './models/Game'
import Resources from '@/components/sections/resources/Resources.vue'
import Management from '@/components/sections/management/Management.vue'
import VillageMap from '@/components/sections/village/VillageMap.vue'

export default defineComponent({
  components: {
    Resources,
    Management,
    VillageMap,
  },
  data() {
    return {
      game: new Game(0, 10, 0, 10),
    }
  },
  methods: {

  }
})
</script>

<style lang="sass" scoped>
</style>
