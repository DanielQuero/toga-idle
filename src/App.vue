<template lang="pug">
.container
  h1 {{ $t('common.title') }}
  resources.resources-section(:resources="resources")
  actions.actions-section(@woodCollected="collectWood" @foodCollected="collectFood")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Resources from '@/components/sections/Resources.vue'
import Actions from '@/components/sections/Actions.vue'
import { Game } from './models/Game'

export default defineComponent({
  components: {
    Resources,
    Actions
  },
  data() {
    return {
      game: new Game(0, 10, 0, 10),
      resources: {}
    }
  },
  methods: {
    collectWood() {
      this.game.colectWood()
      this.updateResources()
    },
    collectFood() {
      this.game.colectFood()
      this.updateResources()
    },
    updateResources() {
      const resources = this.game.getResources()
      this.resources = resources
    }
  },
  mounted() {
    this.updateResources()
  }
})
</script>

<style lang="sass" scoped>
.container
  margin-bottom: 200px
  .resources-section, .actions-section
    margin: 20px 0px
</style>
