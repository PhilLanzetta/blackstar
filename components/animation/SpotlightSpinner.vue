<template>
  <div class="motion-safe:animate-spin-slow -ml-4 select-none" :class="{'w-28 text-sm md:text-base md:w-32 xl:w-40 ': !sm, 'w-28 text-xs md:text-sm xl:w-32 ': sm}">
    <SpotlightSpinnerSvg class="w-full h-full block" />
    <span class="font-medium flex absolute top-0 left-0 w-full h-full justify-center items-center p-10 text-center leading-tight" v-html="text"></span>
  </div>
</template>

<script>
import SpotlightSpinnerSvg from '~/assets/spotlight-spinner-svg.svg?inline'

export default {
  name: 'SpotlightSpinner',
  components: { SpotlightSpinnerSvg },
  props: {
    text: {
      required: false,
      type: String,
      default: 'Spotlight'
    },
    sm: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
