<template>
  <SiteLink :to="to" :class-names="`text-sm py-2 inline-block fade-colours space-x-2 text-${textColorSafe} hover:text-black`">
    <span class="underline"><slot /></span> <span class="text-xl">↗</span>
  </SiteLink>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'TextLink',
  mixins: [ColourScheme],
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    textColorSafe () {
      if (this.textColor === this.$store.state.background) {
        return this.colorScheme
      }

      return this.textColor
    }
  }
}
</script>

<style scoped>

</style>
