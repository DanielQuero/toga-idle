<template lang="pug">
.buildings
  .flex.justify-center.items-center.items-baseline.flex-wrap.pt-4
    .m-1.text-center.flex.flex-col.items-center(class="md:m-2 2xl:mx-6")
      tooltip(:text="$t('buildings.lumberCampDescription')")
        .text-xs(class="md:text-sm") {{ $t('buildings.lumberCamp') }}
      img.w-24.mb-1(class="md:w-32 xl:w-36" :class="{ grayscale: !hasLumberCamp }" src="/images/buildings/lumberCamp.webp")
      tooltip(v-if="!hasLumberCamp" :text="$t('buildings.buyLumberCamp')")
        toga-button(:disabled="!canBuyNextLumberCamp" @click="buyLumberCamp") {{ $t('common.buy') }}
        template(#extraSlot)
          cost(:value="nextLumberCampCost" :game="game")
    .m-1.text-center.flex.flex-col.items-center(class="md:m-2 2xl:mx-6")
      tooltip(:text="$t('buildings.warehouseDescription')")
        .text-xs(class="md:text-sm") {{ $t('buildings.warehouse') }}
      img.w-24.mb-1(class="md:w-32 xl:w-36" :class="{ grayscale: !hasWarehouse }" src="/images/buildings/warehouse.webp")
      tooltip(v-if="!hasWarehouse" :text="$t('buildings.buyWarehouse')")
        toga-button(:disabled="!canBuyNextWarehouse" @click="buyWarehouse") {{ $t('common.buy') }}
        template(#extraSlot)
          cost(:value="nextWarehouseCost" :game="game")
    .m-1.text-center.flex.flex-col.items-center(class="md:m-2 2xl:mx-6")
      tooltip(:text="$t('buildings.portDescription')")
        .text-xs(class="md:text-sm") {{ $t('buildings.port') }}
      img.w-24.mb-1(class="md:w-32 xl:w-36" :class="{ grayscale: !hasPort }" src="/images/buildings/port.webp")
      tooltip(v-if="!hasPort" :text="$t('buildings.buyPort')")
        toga-button(:disabled="!canBuyNextPort" @click="buyPort") {{ $t('common.buy') }}
        template(#extraSlot)
          cost(:value="nextPortCost" :game="game")
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
    buyLumberCamp() {
      this.game.buildingsManager.buyLumberCamp()
    },
    buyWarehouse() {
      this.game.buildingsManager.buyWarehouse()
    },
    buyPort() {
      this.game.buildingsManager.buyPort()
    },
  },
  computed: {
    hasLumberCamp(): boolean {
      return this.game.buildingsManager.getBuildings().lumberCamps.length > 0
    },
    hasWarehouse(): boolean {
      return this.game.buildingsManager.getBuildings().warehouses.length > 0
    },
    hasPort(): boolean {
      return this.game.buildingsManager.getBuildings().ports.length > 0
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
    nextLumberCampCost(): Resources {
      return this.game.buildingsManager.calculateNextLumberCampCost()
    },
    canBuyNextLumberCamp(): boolean {
      return this.game.buildingsManager.canBuyNextLumberCamp()
    },
    nextWarehouseCost(): Resources {
      return this.game.buildingsManager.calculateNextWarehouseCost()
    },
    canBuyNextWarehouse(): boolean {
      return this.game.buildingsManager.canBuyNextWarehouse()
    },
    nextPortCost(): Resources {
      return this.game.buildingsManager.calculateNextPortCost()
    },
    canBuyNextPort(): boolean {
      return this.game.buildingsManager.canBuyNextPort()
    },
  }
})
</script>
