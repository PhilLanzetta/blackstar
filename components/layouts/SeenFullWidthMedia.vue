<template>
  <figure class="seen-article__full-width-media">
    <span v-if="!layout.video" v-html="layout.image" />
    <VideoPlayerRaw v-if="layout.video" :image="layout.image" :video="{type: layout.video, video_embed: layout.video_embed, video_file: layout.video_file, image: layout.image}" />
    <figcaption
      v-if="layout.caption"
      v-html="layout.caption"
    />
  </figure>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenFullWidthMedia',
  mixins: [layout]
}
</script>

<style>
.seen-article__full-width-media {
  @apply relative;
}

.seen-article__full-width-media img {
  @apply block w-full h-auto;
}

.seen-article__full-width-media .video-raw img {
  @apply h-full;
}

</style>
