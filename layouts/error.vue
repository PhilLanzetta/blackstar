<template>
  <div class="min-h-screen bg-gray text-black flex items-center">
    <Container>
      <Space :lg="true" />
      <h1 v-if="error.statusCode === 404">
        Page not found
      </h1>
      <h1 v-else>
        An error occured
      </h1>
      <Space :md="true" />
      <div class="flex items-start">
        <PillButton to="/" class="w-80" color-scheme="black" :force-scheme="true">
          Back to Home
        </PillButton>
        <Space :lg="true" />
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  transition: 'page',
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  async fetch () {
    if (this.$store.state.settings.footer_menus) {
      return
    }

    const settings = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)

    this.$store.commit('setSettings', settings)
  }
}
</script>

<style scoped>
h1 {
  @apply font-medium text-4xl;
}
</style>
