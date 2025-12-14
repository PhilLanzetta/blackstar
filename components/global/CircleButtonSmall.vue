<template>
  <SiteLink
    :to="to"
    :click-handler="clickHandler"
    :class-names="`flex items-center justify-start flex-wrap text-lg font-medium circle-button text-${color}`"
  >
    <span
      class="w-6 h-6 md:w-8 md:h-8 rounded-full block mr-2 sm:mr-4 motion-safe:animate-bounce transition-transform duration-100"
      :class="`bg-${color}`"
    />
    <slot />
  </SiteLink>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'CircleButtonSmall',
  mixins: [ColourScheme],
  props: {
    to: {
      type: String,
      required: true
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
.circle-button:hover span {
  @apply animate-none;
}
</style>
