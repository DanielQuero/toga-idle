<template lang="pug">
.actions
  button(@click="collectWood") {{ $t('resources.pickupWood') }}
  button(@click="collectFood") {{ $t('resources.pickupFood') }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    collectWood() {
      this.$emit('woodCollected')
    },
    collectFood() {
      this.$emit('foodCollected')
    }
  }
})
</script>

<style lang="sass" scoped>
.actions
  width: 200px
  display: flex
  justify-content: space-between
</style>