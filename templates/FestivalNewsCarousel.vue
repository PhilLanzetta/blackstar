<template>
  <ClientOnly>
    <div class="relative">
      <Container class="!px-0">
      <div class="pb-8 flex justify-between items-center space-x-4">
        <div>
          <p class="text-5xl lg:text-6xl 2xl:text-7xl font-serif_bold leading-none uppercase">Related</p>
        </div>
        <div class="flex space-x-2">
          <Festival24SwiperButton :id="`prev-${uniqueId}`" />
          <Festival24SwiperButton :id="`next-${uniqueId}`" type="next" />
        </div>
      </div>
        </Container>
      <swiper ref="swiper" :options="swiperOptions">
        <swiper-slide class="swiper-height" v-for="(card, key) in posts" :key="`card${key}`">
          <Festival24NewsCarouselCard :card="card" /> </swiper-slide>
      </swiper>
    </div>
  </ClientOnly>
</template>

<script>
import livedata from '~/mixins/livedata'
import festivalSwiper from '~/mixins/festivalSwiper'

export default {
  name: 'FestivalNewsCarousel',
  mixins: [livedata, festivalSwiper],
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      swiperOverrideOptions: {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.swiper-container {
  overflow: visible;
}

.swiper-height {
  height: auto;
}

.swiper-button-disabled {
  @apply text-black;
}
</style>
