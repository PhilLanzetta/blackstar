<template>
  <div v-show="$store.state.festival.tabs&&$store.state.festival.tabs.length" class="hidden lg:block bg-bsf12Bg border-b-2 border-black">
    <Space />
    <Container>
      <div class="flex items-end">
        <Festival23Tab
          v-for="(tab, tabKey) in $store.state.festival.tabs"
          :key="`tab${tabKey}`"
          :active="$store.state.festival.activeTab===tab.ID"
          class="-ml-0.5"
          :section-colour="tab.colour"
          :to="tab.permalink|replaceSiteUrl"
          :click-handler="(tab.back_button&&prevRoute ? handleBack : null)"
        >
          <span class="flex space-x-2 items-center">
            <span v-if="tab.back_button"><svg class="block w-4 h-4 transform rotate-90"><use xlink:href="#icon-arrow-down" /></svg></span>
            <span v-if="tab.icon"><svg class="block w-6 h-6 -my-1"><use :xlink:href="`#icon-${tab.icon}`" /></svg></span>
            <span v-html="tab.post_title" />
          </span>
        </Festival23Tab>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  name: 'Festival23Tabs',
  data () {
    return {
      prevRoute: null
    }
  },
  watch: {
    '$route.path' (to, from) {
      this.prevRoute = false
      if (from) {
        if (from.includes('/festival/schedule') || from.includes('/festival/virtual-guide') || from.includes('/festival/event-guide') || from.includes('/festival/my-schedule')) {
          this.prevRoute = from
        }
      }
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
