<template>
  <div class="overflow-hidden">
    <Container>
      <ClientOnly>
        <swiper
          ref="swiper"
          :options="swiperOptions"
        >
          <swiper-slide v-for="(slide, key) in layout.slides" :key="`slide${key}`">
            <Festival24Box :background="(layout.background ? layout.background : null)" :gradient-style="(layout.gradient_style ? layout.gradient_style : null)">
              <div class="overflow-hidden rounded-xl border border-black">
                <Festival24MediaItem :media="slide.media" />
              </div>
            </Festival24Box>
          </swiper-slide>
        </swiper>

        <Space />

        <div class="flex justify-between">
          <Festival24SwiperButton :id="`prev-${uniqueId}`" class="flex-grow-0" />

          <Festival24Pagination class="hidden lg:block" :go-to-page="handleChangePage" :total-pages="totalPages" :active-page="activePage" />

          <Festival24SwiperButton :id="`next-${uniqueId}`" class="flex-grow-0" type="next" />
        </div>
      </ClientOnly>
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import festivalSwiper from '~/mixins/festivalSwiper'

export default {
  name: 'Festival24MediaCarousel',
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
