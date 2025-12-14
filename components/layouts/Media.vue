<template>
  <Container>
    <MediaSlide v-if="layout.slides&&layout.slides.length===1" :slide="layout.slides[0]" />

    <div v-if="layout.slides&&layout.slides.length>1" class="relative rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden">
      <swiper
        :options="{spaceBetween: 100, navigation: {
          nextEl: '.media__next-arrow',
          prevEl: '.media__prev-arrow'
        }}"
      >
        <swiper-slide v-for="(slide, key) in layout.slides" :key="`slide${key}`">
          <MediaSlide :slide="slide" />
        </swiper-slide>
      </swiper>
      <div class="disabled-gray absolute text-white right-0 bottom-0 p-5 z-30">
        <button class="media__prev-arrow">
          <PrevArrow />
        </button>
        <button class="media__next-arrow">
          <NextArrow />
        </button>
      </div>
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import MediaSlide from '~/components/layouts/partials/MediaSlide'

export default {
  name: 'Media',
  components: { MediaSlide },
  mixins: [layout]
}
</script>

<style scoped>

</style>
