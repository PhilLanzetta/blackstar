<template>
  <ClientOnly>
    <swiper :options="swiperOptions">
      <slot />
    </swiper>
  </ClientOnly>
</template>

<script>
export default {
  name: 'LogoCarousel',
  inheritAttrs: true,
  computed: {
    swiperOptions () {
      const options = {
        slidesPerView: 'auto',
        spaceBetween: 0,
        navigation: {
          nextEl: this.$attrs['arrow-next'],
          prevEl: this.$attrs['arrow-prev']
        }
      }

      if (!this.$attrs['arrow-next']) {
        options.autoplay = { delay: 5000 }
      }

      return options
    }
  }
}
</script>

<style scoped>
.swiper-container {
  overflow: visible;
}
</style>
