<template lang="pug">
.jobs
  .flex.justify-center.items-baseline.flex-wrap(class="lg:pt-6")
    .text-center.flex.flex-col.items-center
      img.w-20.mb-1(class="md:w-36 2xl:w-52 2xl:w-56" src="/images/jobs/unemployedCat.webp")
      span.mb-3 {{ $t('jobs.unemployed') }}
      tooltip(:text="$t('buildings.buyHouse')")
      .flex.justify-center.items-center
        span.mt-3.mx-2 {{ unemployedCats }}
    .text-center.flex.flex-col.items-center(v-show="showLumberjackJob")
      img.w-20.mb-1(class="md:w-36 2xl:w-52 2xl:w-56" src="/images/jobs/lumberCat.webp")
      span.mb-3 {{ $t('jobs.lumberjack') }}
      tooltip(:text="$t('buildings.buyHouse')")
      .flex.justify-center.items-center
        toga-button.max-w-8(
          :disabled="lumberjackCats == 0"
          @click="changeCatJob(CAT_JOBS.LUMBERJACK, CAT_JOBS.UNEMPLOYED)"
          waveEffect
        ) -
        span.mx-2 {{ lumberjackCats }}
        toga-button.max-w-8(
          :disabled="unemployedCats == 0"
          @click="changeCatJob(CAT_JOBS.UNEMPLOYED, CAT_JOBS.LUMBERJACK)"
          waveEffect
        ) +
    .text-center.flex.flex-col.items-center(v-show="showFisherJob")
      img.w-20.mb-1(class="md:w-36 2xl:w-52 2xl:w-56" src="/images/jobs/fisherCat.webp")
      span.mb-3 {{ $t('jobs.fisher') }}
      tooltip(:text="$t('buildings.buyHouse')")
      .flex.justify-center.items-center
        toga-button.max-w-8(
          :disabled="fisherCats == 0"
          @click="changeCatJob(CAT_JOBS.FISHER, CAT_JOBS.UNEMPLOYED)"
          waveEffect
        ) -
        span.mx-2 {{ fisherCats }}
        toga-button.max-w-8(
          :disabled="unemployedCats == 0"
          @click="changeCatJob(CAT_JOBS.UNEMPLOYED, CAT_JOBS.FISHER)"
          waveEffect
        ) +
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@/models/Game'
import { JobsEnum, type Jobs } from '@/models/cats/CatsManager'

export default defineComponent({
  name: 'Jobs',
  props: {
    game: {
      type: Game,
      required: true
    },
  },
  data() {
    return {
      CAT_JOBS: JobsEnum,
    }
  },
  methods: {
    changeCatJob(originalJob: Jobs, newJob: Jobs) {
      return this.game.catsManager.changeCatJob(originalJob, newJob)
    },
  },
  computed: {
    showLumberjackJob(): boolean {
      return this.game.buildingsManager.isLumberjackJobAvailable()
    },
    showFisherJob(): boolean {
      return this.game.buildingsManager.isFisherJobAvailable()
    },
    unemployedCats(): number {
      return this.game.catsManager.getCats().jobs.unemployed
    },
    lumberjackCats(): number {
      return this.game.catsManager.getCats().jobs.lumberjack || 0
    },
    fisherCats(): number {
      return this.game.catsManager.getCats().jobs.fisher || 0
    },
  }
})
</script>
