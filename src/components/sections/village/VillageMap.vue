<template lang="pug">
.village.flex.flex-col.border-2.border-black.pt-6
  .relative
    img.sun.absolute.w-24(class="md:w-32 top-[-55px] right-[-30px]" src="/images/sun.png")

  .buildings.mt-1.flex.items-center.flex-wrap
    img.w-24(v-for="house in houses" class="md:w-28 lg:w-32 2xl:w-40" src="/images/buildings/forMap/house_lvl_1.webp")
    img.w-24(v-for="lumberCamp in lumberCamps" class="md:w-28 lg:w-32 2xl:w-40" src="/images/buildings/forMap/lumberCamp.webp")
    img.w-24(v-for="warehouse in warehouses" class="md:w-28 lg:w-32 2xl:w-40" src="/images/buildings/forMap/warehouse.webp")
    img.w-24(v-for="port in ports" class="md:w-28 lg:w-32 2xl:w-40" src="/images/buildings/forMap/port.webp")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@/models/Game'

export default defineComponent({
  props: {
    game: {
      type: Game,
      required: true
    },
  },
  computed: {
    houses() {
      return this.game.buildingsManager.getBuildings().houses || []
    },
    lumberCamps() {
      return this.game.buildingsManager.getBuildings().lumberCamps || []
    },
    warehouses() {
      return this.game.buildingsManager.getBuildings().warehouses || []
    },
    ports() {
      return this.game.buildingsManager.getBuildings().ports || []
    },
  },
})
</script>

<style lang="sass" scoped>
.village, .grass-background
  background-image: url('/background/village-field.png')
  background-size: 70px

  .sun
    animation: rotation 1s steps(4) infinite

@keyframes rotation
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

</style>