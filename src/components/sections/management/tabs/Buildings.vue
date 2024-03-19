<template lang="pug">
.buildings
  .flex.justify-center.items-center.flex-wrap.pt-6
    .m-2.text-center.flex.flex-col.items-center
      img.w-20.mb-1(class="md:w-28" src="/images/buildings/house.webp")
      tooltip(:text="$t('buildings.buyHouse')")
        toga-button(:disabled="!canBuyNextHouse" @click="buyHouse") {{ $t('buildings.buyHouse') }}
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
  methods: {
    buyHouse() {
      this.game.buildingsManager.buyHouse()
    },
  },
  computed: {
    houses() {
      return this.game.buildingsManager.getBuildings().houses || []
    },
    nextHouseCost(): Resources {
      return this.game.buildingsManager.calculateNextHouseCost()
    },
    canBuyNextHouse(): boolean {
      return this.game.buildingsManager.canBuyNextHouse()
    }
  }
})
</script>
