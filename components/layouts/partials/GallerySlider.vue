<template>
  <div class="relative rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden">
    <RawLink v-if="link" v-cursor-hint="'View Full Album'" :to="link|replaceSiteUrl" class-names="absolute top-0 left-0 w-full h-full z-10">
      <span class="sr-only" v-html="gallery.title" />
    </RawLink>
    <swiper
      :options="{spaceBetween: 100, navigation: {
        nextEl: `.gallery-slider__next-arrow--${uniqueId}`,
        prevEl: `.gallery-slider__prev-arrow--${uniqueId}`
      }}"
    >
      <swiper-slide v-for="(slide, key) in gallery.acf.items" :key="`slide${key}`">
        <MediaSlide :slide="slide" />
      </swiper-slide>
    </swiper>
    <div
      class="block bottom-0 left-0 h-auto absolute w-full bg-black text-white p-8 z-20 font-medium text-xl"
      v-html="gallery.title.rendered"
    />
    <div class="disabled-gray absolute text-white right-0 bottom-0 p-5 z-30">
      <button class="media-slider__prev-arrow" :class="`gallery-slider__prev-arrow--${uniqueId}`">
        <PrevArrow />
      </button>
      <button class="media-slider__next-arrow" :class="`gallery-slider__next-arrow--${uniqueId}`">
        <NextArrow />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GallerySlider',
  props: {
    gallery: {
      type: Object,
      required: true
    },
    link: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    uniqueId () {
      return this._uid
    }
  }
}
</script>

<style scoped>

</style>
