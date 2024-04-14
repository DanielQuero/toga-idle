<template lang="pug">
.buildings
  .flex.justify-center.items-center.items-baseline.flex-wrap.pt-2
    .m-1.text-center.flex.flex-col.items-center(class="md:m-2 2xl:mx-6" v-for="(house, index) in maxHouses")
      tooltip(:text="$t('buildings.houseDescription')")
        .text-xs(class="md:text-sm") {{ $t('buildings.basicHouse') }}
      img.w-24.mb-1(class="md:w-32 xl:w-36" :class="{grayscale: !houses[index]}" src="/images/buildings/house.webp")
      tooltip.opacity-0(:class="{'opacity-100': index == houses.length}" :text="$t('buildings.buyHouse')")
        toga-button(:disabled="!canBuyNextHouse || index != houses.length" @click="buyHouse") {{ $t('common.buy') }}
        template(#extraSlot)
          cost(:value="nextHouseCost" :game="game")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@/models/Game'
import type { Resources } from '@/models/resources/ResourcesManager'

export default defineComponent({
  props: {
    game: {
      type: Game,
      required: true
    }
  },
  data() {
    return {
      maxHouses: 5,
    }
  },
  methods: {
    buyHouse() {
      this.game.buildingsManager.buyHouse()
    },
  },
  computed: {
    numHousesLeftToBuild(): number {
      return this.maxHouses - this.houses.length
    },
    houses() {
      return this.game.buildingsManager.getBuildings().houses || []
    },
    nextHouseCost(): Resources {
      return this.game.buildingsManager.calculateNextHouseCost()
    },
    canBuyNextHouse(): boolean {
      return this.game.buildingsManager.canBuyNextHouse()
    },
  }
})
</script>
