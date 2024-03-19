<template lang="pug">
.actions
  .actions-list.flex.justify-center.items-center.flex-wrap.pt-6
    .m-2.text-center.flex.flex-col.items-center
      img.w-20.mb-1(class="md:w-28" src="/images/actions/chopTree.webp")
      tooltip.m-2(:text="$t('resources.pickupWoodDescription')")
        toga-button(@click="collectWood" :disabled="!canCollectWood")
          | {{ $t('resources.pickupWood') }}
          img.ml-3(src="/images/resources/wood.webp" width="32")
    .m-2.text-center.flex.flex-col.items-center
      img.w-20.mb-1(class="md:w-28" src="/images/actions/fishing.webp")
      tooltip.m-2(:text="$t('resources.pickupFoodDescription')")
        toga-button(@click="collectFood" :disabled="!canCollectFood")
          | {{ $t('resources.pickupFood') }}
          img.ml-3(src="/images/resources/food.webp" width="32")
    .m-2.text-center.flex.flex-col.items-center
      img.w-20.mb-1(class="md:w-28" src="/images/actions/attractCat.webp")
      tooltip.m-2(:text="$t('cats.attractCatDescription')")
        toga-button(:disabled="!canAttractNextCat" @click="attractCat")
          | {{ $t('cats.attractCat') }}
          img.ml-3(src="/images/resources/cat.webp" width="32")
        template(#extraSlot)
          cost(:value="nextCatCost" :game="game")
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
    collectWood() {
      this.game.resourcesManager.collectWood()
    },
    collectFood() {
      this.game.resourcesManager.collectFood()
    },
    attractCat() {
      this.game.catsManager.getNewCat()
    },
  },
  computed: {
    nextCatCost(): Resources {
      return this.game.catsManager.calculateNextCatCost()
    },
    canAttractNextCat(): boolean {
      return this.game.catsManager.canAttractNextCat()
    },
    canCollectWood(): boolean {
      const resources = this.game.resourcesManager.getResources()
      return resources.wood < resources.maxWood
    },
    canCollectFood(): boolean {
      const resources = this.game.resourcesManager.getResources()
      return resources.food < resources.maxFood
    },
  }
})
</script>
