<template>
  <div class="md:grid md:grid-cols-2 md:gap-8 justify-center space-y-10 md:space-y-0">
    <Festival24Spotlight v-for="(spotlight, key) in layout.spotlight" :key="`spotlight${key}`" :spotlight="spotlight" />
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival24Spotlights',
  mixins: [layout]
}
</script>

<style scoped>

</style>
