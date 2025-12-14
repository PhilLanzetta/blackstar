<template>
  <div v-if="settings&&settings.show_mobile_intro" class="pt-4 pb-6 rounded-b-3xl block lg:hidden" :class="`bg-${settings.background}`">
    <Festival24Section :section="{background: settings.background, layouts: [], style: 'contained'}">
      <Festival24Heading :layout="{heading: settings.title, links: settings.links}" />
    </Festival24Section>
  </div>
</template>

<script>
export default {
  name: 'Festival24TabsIntro',
  computed: {
    settings () {
      if (this.$store.state.festival && this.$store.state.festival.tabSettings && this.$store.state.festival.tabSettings) {
        return this.$store.state.festival.tabSettings
      }

      return false
    }
  }

}
</script>

<style scoped>

</style>
