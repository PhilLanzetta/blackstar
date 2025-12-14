<template>
  <div class="flex items-start space-x-4">
    <div v-for="(mediaItem, mediaKey) in layout.media" :key="`seenMedia${mediaKey}`" class="w-1/2">
      <SeenFullWidthMedia :layout="mediaItem" />
    </div>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenMediaTwoColumns',
  mixins: [layout]
}
</script>

<style>
</style>
