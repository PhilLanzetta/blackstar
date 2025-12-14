<template>
  <div v-show="$store.state.festival.tabs&&$store.state.festival.tabs.length" class="relative lg:static lg:z-0 z-40" :class="($store.state.theme==='bsf14'&&$store.state.festival.tabSettings ? `pt-14 lg:pt-0 bg-${$store.state.festival.tabSettings.background}` : '')">
    <Festival24TabsIntro />
    <div class="lg:hidden relative -z-10 h-24" :class="{'-mt-6': ($store.state.festival && $store.state.festival.tabSettings) || $store.state.theme==='bsf13'}">
      <button class="z-20 relative bg-black flex justify-between mx-auto rounded-b-3xl px-4 sm:px-8 text-white pb-8 pt-14 sm:pt-16 w-full" @click.prevent="mobileTabsExpanded=!mobileTabsExpanded">
        <span class="font-sans whitespace-nowrap text-2xl">Jump to</span>
        <span class="rotate-45 transition-all duration-300 ease-in-out" :class="{ 'rotate-90': mobileTabsExpanded}">
          <svg class="h-8 w-8 fill-beige" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z" />
          </svg>
        </span>
      </button>
      <div class="bg-black mx-auto px-4 sm:px-8 -mt-6 pt-6 pb-10 rounded-b-3xl -z-20 text-white relative -top-96 transition-all duration-500 ease-in-out" :class="{ '!top-0': mobileTabsExpanded}">
        <ul class="space-y-5">
          <li
            v-for="(tab, tabKey) in $store.state.festival.tabs"
            :key="`mobileTab${tabKey}`"
            class="text-base underline-offset-[6px]"
          >
            <SiteLink
              :to="tab.permalink | replaceSiteUrl"
              :click-handler="(tab.back_button && prevRoute ? handleBack : null)"
              :class-names="($store.state.festival.activeTab === tab.ID ? `underline tab-${tab.colour}` : '')"
            >
              <span v-html="tab.post_title" />
            </SiteLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="hidden lg:block" :class="{' border-b border-black pt-24': $store.state.theme === 'bsf13', 'pt-32': $store.state.theme === 'bsf14'}">
      <Space />
      <Container>
        <div class="flex items-end">
          <Festival24Tab
            v-for="(tab, tabKey) in $store.state.festival.tabs"
            :key="`tab${tabKey}`"
            :active="$store.state.festival.activeTab===tab.ID"
            :background="tab.colour"
            :to="tab.permalink|replaceSiteUrl"
            :click-handler="(tab.back_button&&prevRoute ? handleBack : null)"
          >
            <span class="flex space-x-2 items-center">
              <span v-if="tab.back_button"><svg class="block w-4 h-4 transform rotate-90"><use xlink:href="#icon-arrow-down" /></svg></span>
              <span v-if="tab.icon"><svg class="block w-6 h-6 -my-1"><use :xlink:href="`#icon-${tab.icon}`" /></svg></span>
              <span v-html="tab.post_title" />
            </span>
          </Festival24Tab>
        </div>
      </Container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Festival24Tabs',
  data () {
    return {
      prevRoute: null,
      mobileTabsExpanded: false
    }
  },
  mounted () {
    console.log('tabs', this.$store.state.festival.tabSettings)
  },
  watch: {
    '$route.path' (to, from) {
      this.prevRoute = false
      if (from) {
        if (from.includes('/festival/schedule') || from.includes('/festival/event-guide') || from.includes('/festival/my-schedule')) {
          this.prevRoute = from
          this.$store.commit('festival/setTabContext', from)
        } else {
          this.$store.commit('festival/setTabContext', null)
        }
      }

      this.mobileTabsExpanded = false
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.tab-bsf13purple {
  @apply text-bsf13purple
}
.tab-bsf13orange {
  @apply text-bsf13orange
}
.tab-bsf13green {
  @apply text-bsf13green
}
.tab-beige {
  @apply text-beige
}
</style>
