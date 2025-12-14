<template>
  <div class="max-w-screen-lg mx-auto 2xl:max-w-full">
    <Container>
      <Festival23BoxMask>
        <VideoPlayerRaw :video="video" :image="layout.cover_image" :custom-button="true">
          <Festival23PlayButton />
        </VideoPlayerRaw>
      </Festival23BoxMask>
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival23VideoCover',
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
