<template>
  <figure class="bsf24-media-item" :class="{'bsf24-media-item--cinema': cinema}">
    <span v-html="media.image" />
    <video
      v-if="media.video"
      class="bg-black"
      autoplay
      muted
      loop
      playsinline
    >
      <source type="video/mp4" :src="media.video">
    </video>
    <figcaption v-if="media.caption">
      <p v-html="media.caption" />
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'Festival24MediaItem',
  props: {
    media: {
      type: Object,
      required: true
    },
    cinema: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.bsf24-media-item {
  @apply relative w-full aspect-w-10 aspect-h-10 md:aspect-10 md:aspect-h-8 lg:aspect-w-16 lg:aspect-h-8 4xl:aspect-w-16 4xl:aspect-h-9;
}

.bsf24-media-item--cinema {
  @apply aspect-w-10 aspect-h-10 md:aspect-10 md:aspect-h-8 lg:aspect-w-16 lg:aspect-h-9;
}

.bsf24-media-item img,
.bsf24-media-item video {
  @apply absolute top-0 left-0 w-full h-full object-cover;
}

.bsf24-media-item img {
  @apply z-0;
}

.bsf24-media-item video {
  @apply z-10;
}

.bsf24-media-item figcaption {
  @apply absolute left-0 bottom-0 w-full h-auto z-20 top-auto opacity-0 transition-opacity duration-300;
}

.bsf24-media-item figcaption p {
  @apply block bg-black text-white text-center p-2 text-xs xl:text-sm xl:p-3 2xl:p-5 2xl:text-base rounded-tl-3xl rounded-tr-3xl;
}

.bsf24-media-item--cinema figcaption p {
  @apply pb-[65px];
}

.bsf24-media-item:hover figcaption {
  @apply opacity-100;
}

</style>
