<template lang="pug">
.resources
  p {{ $t('resources.wood') }}: {{ resources.wood }} / {{ resources.maxWood }}
  p {{ $t('resources.food') }}: {{ resources.food }} / {{ resources.maxFood }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    resources: Object
  }
})
</script>
