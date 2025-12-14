<template>
  <div class="motion-safe:animate-spin-slow w-28 lg:w-48 -ml-4 select-none">
    <SpinnerSvg class="w-full h-full block" />
    <span class="flex text-sm lg:text-lg absolute top-0 left-0 w-full h-full justify-center items-center p-10 text-center leading-tight" v-html="text"></span>
  </div>
</template>

<script>
import SpinnerSvg from '~/assets/spinner-svg.svg?inline'

export default {
  name: 'Spinner',
  components: { SpinnerSvg },
  props: {
    text: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>

</style>
