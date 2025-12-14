<template>
  <div class="rich-carousel-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FestivalRichCardCarouselWrapper'
}
</script>

<style>
.rich-carousel-wrapper {
  @apply overflow-hidden select-none;
}

.rich-carousel-wrapper .swiper-container {
  @apply overflow-visible
}

.rich-carousel-wrapper .swiper-wrapper {
  @apply items-stretch;
}

.rich-carousel-wrapper .swiper-wrapper .swiper-slide {
  @apply h-auto;
}

.rich-carousel-wrapper .swiper-wrapper .festival-23-box {
  @apply h-full;
}
</style>
