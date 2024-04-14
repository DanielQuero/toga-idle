<template lang="pug">
h1.text-xl.font-bold.underline.text-center.my-1(class="md:text-2xl lg:text-3xl lg:my-3")
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionTitle',
})
</script>
