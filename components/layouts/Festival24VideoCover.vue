<template>
  <Festival24Box :background="(layout.background ? layout.background : null)" :gradient-style="(layout.gradient_style ? layout.gradient_style : null)">
    <div class="rounded-xl overflow-hidden" :class="{' border border-black': $store.state.theme==='bsf13'}">
      <VideoPlayerRaw :video="video" :image="layout.cover_image" :custom-button="true">
        <Festival23PlayButton />
      </VideoPlayerRaw>
    </div>
  </Festival24Box>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival24VideoCover',
  mixins: [layout],
  computed: {
    video () {
      return {
        type: this.layout.video_type,
        video_file: this.layout.video_file,
        video_embed: this.layout.video_embed
      }
    }
  }
}
</script>

<style scoped>

</style>
