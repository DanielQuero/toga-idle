<template lang="pug">
.actions
  .actions-list.flex.justify-center.items-center.flex-wrap.pt-2(class="lg:pt-6")
    .m-2.text-center.flex.flex-col.items-center(class="md:m-2 2xl:mx-6")
      img.w-24.mb-1(class="md:w-32 xl:w-36" src="/images/actions/chopTree.webp")
      tooltip(:text="$t('actions.pickupWoodDescription')")
        toga-button(@click="collectWood" :disabled="!canCollectWood" waveEffect)
          | {{ $t('actions.pickupWood') }}
          img.ml-1.w-6(class="lg:w-8 md:ml-3" src="/images/resources/wood.webp")
    .m-2.text-center.flex.flex-col.items-center(class="md:m-2 2xl:mx-6")
      img.w-24.mb-1(class="md:w-32 xl:w-36" src="/images/actions/fishing.webp")
      tooltip(:text="$t('actions.pickupFoodDescription')")
        toga-button(@click="collectFood" :disabled="!canCollectFood" waveEffect)
          | {{ $t('actions.pickupFood') }}
          img.ml-1.w-6(class="lg:w-8 md:ml-3" src="/images/resources/food.webp")
    .m-2.text-center.flex.flex-col.items-center(class="md:m-2 2xl:mx-6")
      img.w-24.mb-1(class="md:w-32 xl:w-36" src="/images/actions/attractCat.webp")
      tooltip(:text="$t('cats.attractCatDescription')")
        toga-button(:disabled="!canAttractNextCat" @click="attractCat" waveEffect)
          | {{ $t('cats.attractCat') }}
          img.ml-1.w-6(class="lg:w-8 md:ml-3" src="/images/resources/cat.webp")
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
