<template lang="pug">
.resources.text-sm(class="lg:text-lg")
  section-title {{ $t('common.resourcesTitle') }}

  .resource.ml-8.mb-2
    tooltip(:text="$t('resources.woodDescription')")
      .flex.items-center
        img.mr-3(src="/images/resources/wood.webp" width="40")
        p
          b {{ $t('resources.wood') }}:
          span.ml-1(:class="{'text-red-600': wood === maxWood}") {{ wood }}
          span.ml-1 /
          span.ml-1 {{ maxWood }}
  .resource.ml-8.mb-2
    tooltip(:text="$t('resources.foodDescription')")
      .flex.items-center
        img.mr-3(src="/images/resources/food.webp" width="40")
        p
          b {{ $t('resources.food') }}:
          span.ml-1(:class="{'text-red-600': food === maxFood}") {{ food }}
          span.ml-1 /
          span.ml-1 {{ maxFood }}
  .resource(v-show="maxCats > 0")
    tooltip(:text="$t('cats.catDescription')")
      .flex.items-center.ml-8.mb-2
        img.mr-3(src="/images/resources/cat.webp" width="40")
        p
          b {{ $t('cats.cats') }}:
          span.ml-1(:class="{'text-red-600': cats === maxCats}") {{ cats }}
          span.ml-1 /
          span.ml-1 {{ maxCats }}
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
    cats() {
      return this.game?.catsManager.getCats().cats || 0
    },
    maxCats() {
      return this.game?.catsManager.getCats().maxCats || 0
    },
  },
})
</script>

<style lang="sass" scoped>
</style>
