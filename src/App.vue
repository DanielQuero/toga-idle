<template lang="pug">
.grid.grid-cols-1.border-black.border-2.p-1.rounded-lg.bg-ui-bg-dark.mx-4.my-4(
  class="xl:h-[60vh] sm:grid-cols-6 lg:grid-cols-9 sm:gap-1 md:mx-6 lg:mx-12 2xl:mx-28"
)
  resources.col-span-3.bg-section-bg.border-2.border-black.rounded-lg(
    class="sm:col-span-2 lg:col-span-2"
    :game="game"
  )
  management.col-span-4.my-2(class="sm:my-0" :game="game")
  village-map.col-span-6.border-2.border-black.rounded-lg.col-span-1.min-h-80(
    class="lg:col-span-3"
    :game="game"
  )
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
      game: new Game(0, 20, 0, 20),
	    timer: undefined as number | undefined
    }
  },
  created() {
    // This is done here instead of the Game file to maintain vue's reactivity
    this.createGameInterval()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    createGameInterval() {
      this.timer = setInterval(() => {
        this.nextTick()
      }, 1000)
    },
    nextTick() {
      this.game.resourcesManager.addResourcesCollected()
    }
  }
})
</script>

<style lang="sass" scoped>
</style>
