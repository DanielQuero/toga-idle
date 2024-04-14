<template lang="pug">
.resources.text-sm.pb-2(class="lg:text-lg")
  section-title {{ $t('common.resourcesTitle') }}
  .flex.flex-wrap.items-center.justify-center(class="md:justify-normal")
    .mx-1.my-1(class="lg:mx-6 lg:mb-2 xl:mx-6 2xl:mx-8")
      tooltip(:text="$t('resources.woodDescription')")
        .flex.items-center
          img.mr-1(class="w-8 lg:w-10 lg:mr-3" src="/images/resources/wood.webp")
          .flex.justify-center.flex-wrap
            .flex.items-center.justify-center
              .font-bold.w-14(class="lg:w-20") {{ $t('resources.wood') }}:
              .ml-1.w-8(class="lg:w-10" :class="{'text-red-600': wood === maxWood}") {{ wood }}
              span.ml-1.opacity-60 /
              .ml-1.opacity-60 {{ maxWood }}
            .ml-2.text-green-600(v-show="resourcesCollectedAutomatically.wood") +{{ resourcesCollectedAutomatically.wood }}/s
    .mx-1.my-1(class="lg:mx-6 lg:mb-2 xl:mx-6 2xl:mx-8")
      tooltip(:text="$t('resources.foodDescription')")
        .flex.items-center
          img.mr-1(class="w-8 lg:w-10 lg:mr-3" src="/images/resources/food.webp")
          .flex.items-center.justify-center.flex-wrap
            .flex.items-center.justify-center
              .font-bold.w-14(class="lg:w-20") {{ $t('resources.food') }}:
              .ml-1.w-8(class="lg:w-10" :class="{'text-red-600': food === maxFood}") {{ food }}
              span.ml-1.opacity-60 /
              .ml-1.opacity-60.w-6 {{ maxFood }}
            .ml-2.text-green-600(v-show="resourcesCollectedAutomatically.food") +{{ resourcesCollectedAutomatically.food }}/s
    .mx-2.my-1(class="lg:mx-6 lg:mb-2 xl:mx-6 2xl:mx-8" v-show="maxCats > 0")
      tooltip(:text="$t('cats.catDescription')")
        .flex.items-center
          img.mr-1(class="w-8 lg:w-10 lg:mr-3" src="/images/resources/cat.webp")
          .flex.items-center
            .font-bold.w-14(class="lg:w-20") {{ $t('cats.cats') }}:
            .ml-1.w-8(class="lg:w-10" :class="{'text-red-600': totalCats === maxCats}") {{ totalCats }}
            span.ml-1.opacity-60 /
            .ml-1.opacity-60.w-6.w-6 {{ maxCats }}
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
    wood() {
      return this.game?.resourcesManager.getResources().wood || 0
    },
    maxWood() {
      return this.game?.resourcesManager.getResources().maxWood || 0
    },
    food() {
      return this.game?.resourcesManager.getResources().food || 0
    },
    maxFood() {
      return this.game?.resourcesManager.getResources().maxFood || 0
    },
    totalCats() {
      return this.game?.catsManager.getCats().totalCats || 0
    },
    maxCats() {
      return this.game?.catsManager.getCats().maxCats || 0
    },
    resourcesCollectedAutomatically() {
      return this.game?.catsManager.resourcesCollectedEveryTick()
    },
  },
})
</script>

<style lang="sass" scoped>
</style>
