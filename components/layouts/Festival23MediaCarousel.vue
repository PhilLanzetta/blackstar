<template>
  <div class="overflow-hidden">
    <Container class="max-w-screen-lg 2xl:max-w-screen-xl relative pt-12 md:pt-0">
      <ClientOnly>
        <swiper
          ref="swiper"
          :options="swiperOptions"
        >
          <swiper-slide v-for="(slide, key) in layout.slides" :key="`slide${key}`">
            <Festival23BoxMask>
              <Festival23MediaItem :media="slide.media" />
            </Festival23BoxMask>
          </swiper-slide>
        </swiper>

        <Space />

        <div class="flex absolute top-0 right-4 space-x-2 md:space-x-0 md:static md:justify-between">
          <Festival23SwiperButton :id="`prev-${uniqueId}`" class="flex-grow-0" />

          <Festival23Pagination class="hidden lg:block" :go-to-page="handleChangePage" :total-pages="totalPages" :active-page="activePage" />

          <Festival23SwiperButton :id="`next-${uniqueId}`" class="flex-grow-0" type="next" />
        </div>
      </ClientOnly>
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import festivalSwiper from '~/mixins/festivalSwiper'

export default {
  name: 'Festival23MediaCarousel',
  mixins: [layout, festivalSwiper],
  data () {
    return {
      swiperOverrideOptions: { spaceBetween: 20 }
    }
  }
}
</script>

<style scoped>
.swiper-container {
  @apply overflow-visible
}
</style>
