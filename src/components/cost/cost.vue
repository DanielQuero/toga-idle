<template lang="pug">
.const
  ul
    li(v-if="value.wood")
      span {{ $t('resources.wood') }}:
      span.ml-2(:class="{'text-red-600': currentWood < value.wood}") {{ currentWood }} / {{ value.wood }}
    li(v-if="value.food")
      span {{ $t('resources.food') }}:
      span.ml-2(:class="{'text-red-600': currentFood < value.food}") {{ currentFood }} / {{ value.food }}
    li(v-if="value.freeHouse")
      span {{ $t('resources.freeHouse') }}:
      span.ml-2(:class="{'text-red-600': currentHouseSpaceAvailable < value.freeHouse}") {{ currentHouseSpaceAvailable }} / {{ value.freeHouse }}
</template>

<script lang="ts">
import type { Resources } from '@/models/resources/ResourcesManager'
import { Game } from '@/models/Game'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'Cost',
  props: {
    game: {
      type: Game,
      required: true
    },
    value: {
      type: Object as () => Resources,
      required: true
    }
  },
  computed: {
    currentWood() {
      return this.game?.resourcesManager.getResources().wood || 0
    },
    currentFood() {
      return this.game?.resourcesManager.getResources().food || 0
    },
    currentHouseSpaceAvailable() {
      return this.game?.catsManager.getFreeHousingSpace() || 0
    },
  }
})
</script>
