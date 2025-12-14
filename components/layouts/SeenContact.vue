<template>
  <Container v-if="settings">
    <SeenHeadingLarge :heading="layout.heading" />
    <p><a v-cursor-interact :href="`mailto:${settings.email}?subject=Seen`" v-html="settings.email" /></p>
    <SeenSocialNav :justify-end="false" :settings="settings.social_links" />
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import SeenHeadingLarge from '~/components/layouts/partials/SeenHeadingLarge'
import SeenSocialNav from '~/components/layouts/partials/SeenSocialNav'

export default {
  name: 'SeenContact',
  components: { SeenHeadingLarge, SeenSocialNav },
  mixins: [layout],
  computed: {
    settings () {
      if (this.$store.state.settings) {
        return this.$store.state.settings.seen
      }

      return false
    }
  }
}
</script>

<style scoped>
p {
  @apply text-lg;
}
</style>
