<template lang="pug">
.flex.flex-col.min-h-96(class="max-h-[50dvh] lg:max-h-[60dvh]")
  tabs(:tabs="tabs" @changeTab="changeTab")
  .bg-section-bg.flex-auto.border-2.border-black.rounded-b-lg.overflow-y-hidden
    component(
      v-if="activeTabComponent"
      :is="activeTabComponent"
      :game="game"
    )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@/models/Game'
import Tabs, { type Tab } from '@/components/tabs/tabs.vue'
import Actions from './tabs/Actions.vue'
import Buildings from './tabs/Buildings.vue'
import Houses from './tabs/Houses.vue'
import Jobs from './tabs/Jobs.vue'
import Settings from './tabs/Settings.vue'
import { i18n } from '@/utils/i18n'

export default defineComponent({
  name: 'Management',
  components: {
    Tabs,
    Actions,
    Buildings,
    Houses,
    Jobs,
    Settings,
  },
  props: {
    game: {
      type: Game,
      required: true
    },
  },
  data() {
    return {
      selectedTabIndex: 0,
    };
  },
  methods: {
    changeTab(newSelectedTabIndex: number) {
      this.selectedTabIndex = newSelectedTabIndex
    }
  },
  computed: {
    tabs(): Tab[] {
      const tabs: Tab[] = [
        { title: i18n.global.t('common.actionsTitle'), component: 'Actions', selected: false },
        { title: i18n.global.t('common.housesTitle'), component: 'Houses', selected: false },
        { title: i18n.global.t('common.buildingsTitle'), component: 'Buildings', selected: false },
      ]

      if (this.isJobsTabAvailable) {
        tabs.push({ title: i18n.global.t('common.jobsTitle'), component: 'Jobs', selected: false })
      }

      tabs.push({ title: '', icon: new URL('/images/tabs/settings.webp', import.meta.url).href, component: 'Settings', selected: false })
      tabs[this.selectedTabIndex].selected = true

      return tabs
    },
    activeTabComponent(): string {
      return this.tabs.find((tab) => {
        return tab.selected
      })?.component || ''
    },
    isJobsTabAvailable(): boolean {
      return this.game.buildingsManager.isAnyJobAvailable()
    }
  },
});
</script>
