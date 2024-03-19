<template lang="pug">
h1.text-3xl.font-bold.underline.text-center.my-3
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionTitle',
})
</script>
