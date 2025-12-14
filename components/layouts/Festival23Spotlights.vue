<template>
  <Container>
    <div class="flex flex-wrap -mx-4 space-y-10 md:space-y-0">
      <div v-for="(spotlight, key) in layout.spotlight" :key="`spotlight${key}`" class="px-4" :class="{'w-full md:w-1/2': layout.spotlight.length > 1, 'w-full': !(layout.spotlight.length > 1)}">
        <Festival23Spotlight :spotlight="spotlight" :colour="(key%2===1 ? 'bg-bsf12green' : 'bg-bsf12blue')" />
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival23Spotlights',
  mixins: [layout]
}
</script>

<style scoped>

</style>
