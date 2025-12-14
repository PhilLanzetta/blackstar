<template>
  <div class="rounded-tl-4xl rounded-tr-4xl overflow-hidden relative">
    <Festival24MediaItem :media="layout.media" :cinema="true" />
    <div class="w-full h-[50px] absolute bottom-0 left-0 z-20 rounded-tl-4xl rounded-tr-4xl" :class="`bg-${sectionColour}`"></div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival24MediaHero',
  mixins: [layout],
  props: {
    sectionColour: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
