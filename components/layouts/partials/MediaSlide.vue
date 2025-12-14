<template>
  <figure
    class="block media-slide w-full h-auto rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden relative aspect-h-9 aspect-w-16"
  >
    <div>
      <span v-if="!slide.video_type" class="cover-image z-0" v-html="slide.image" />
      <VideoPlayerRaw v-if="slide.video_type" :image="slide.image" :video="{type: slide.video_type, video_embed: slide.video_embed, video_file: slide.video_file, image: slide.image}" />
      <figcaption
        v-if="slide.caption"
        class="block bottom-0 left-0 h-auto absolute w-full bg-black text-white p-8 z-10 font-medium text-xl"
        v-html="slide.caption"
      />
    </div>
  </figure>
</template>

<script>
export default {
  name: 'MediaSlide',
  props: {
    slide: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.media-slide {
  @apply aspect-h-9 aspect-w-16;
}

.media-slide figcaption {
  height: auto !important;
}
</style>
