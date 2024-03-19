<template lang="pug">
.village.flex.flex-col.border-2.border-black.pt-6
  .relative
    .sun
      .ray_box
            .ray.ray1
            .ray.ray2
            .ray.ray3
            .ray.ray4
            .ray.ray5
            .ray.ray6
            .ray.ray7
            .ray.ray8
            .ray.ray9
            .ray.ray10

  .buildings.flex.mt-1.flex-wrap
    img(v-for="house in houses" src="/images/buildings/forMap/house_lvl_1.webp" width="160")
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
    houses() {
      return this.game.buildingsManager.getBuildings().houses || []
    },
  },
})
</script>

<style lang="sass" scoped>
.village
  background-image: url('/background/village-field.png')
  background-size: 70px
.sun
  position: absolute
  top: 0
  right: 10px
  margin: auto
  width: 70px
  height: 70px
  border-radius: 50%
  background: white
  opacity: 0.9
  box-shadow: 0px 0px 40px 15px white

  .ray_box
    position: absolute
    margin: auto
    top: 0px
    left: 0
    right: 0
    bottom: 0
    width: 70px
    animation: ray_anim 120s linear infinite

    .ray
      background: linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)

      margin-left: 10px
      border-radius: 80% 80% 0 0
      position: absolute
      opacity: 0.1

    .ray1
      height: 170px
      width: 30px
      transform: rotate(180deg)
      top: -175px
      left: 15px

    .ray2
      height: 100px
      width: 8px
      transform: rotate(220deg)
      top: -90px
      left: 75px

    .ray3
      height: 170px
      width: 50px
      transform: rotate(250deg)
      top: -80px
      left: 100px

    .ray4
      height: 120px
      width: 14px
      transform: rotate(305deg)
      top: 30px
      left: 100px

    .ray5
      height: 140px
      width: 30px
      transform: rotate(-15deg)
      top: 60px
      left: 40px

    .ray6
      height: 90px
      width: 50px
      transform: rotate(30deg)
      top: 60px
      left: -40px

    .ray7
      height: 180px
      width: 10px
      transform: rotate(70deg)
      top: -35px
      left: -40px

    .ray8
      height: 120px
      width: 30px
      transform: rotate(100deg)
      top: -45px
      left: -90px

    .ray9
      height: 80px
      width: 10px
      transform: rotate(120deg)
      top: -65px
      left: -60px

    .ray10
      height: 190px
      width: 23px
      transform: rotate(150deg)
      top: -185px
      left: -60px

@keyframes ray_anim
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

</style>