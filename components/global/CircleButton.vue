<template>
  <SiteLink
    :to="to"
    :click-handler="clickHandler"
    :class-names="`flex items-center justify-start flex-wrap text-lg sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-medium circle-button text-${color}`"
  >
    <span
      class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-full block mr-2 sm:mr-4 motion-safe:animate-bounce transition-transform duration-100"
      :class="`bg-${color}`"
    />
    <slot />
  </SiteLink>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'CircleButton',
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
