<template>
  <span class="flex items-center justify-center">
    <svg class="block w-8 sm:w-10 md:w-16 xl:w-20 h-auto lg:motion-safe:animate-bounce">
      <use xlink:href="#icon-play-25" v-if="$store.state.theme==='bsf14'" />
      <use xlink:href="#icon-play" v-else />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'Festival23PlayButton'
}
</script>

<style scoped>

</style>
