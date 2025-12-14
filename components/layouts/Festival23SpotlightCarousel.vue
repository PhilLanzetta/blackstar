<template>
  <ClientOnly>
    <div class="relative">
      <swiper ref="swiper" :options="swiperOptions">
        <swiper-slide v-for="(card, key) in cards" :key="`card${key}`">
          <Festival23SpotlightRichCard :card="card" />
        </swiper-slide>
      </swiper>
      <div class="3xl:absolute bottom-0 left-0 w-full z-20 pointer-events-none mt-4 lg:mt-0">
        <Container>
          <div class="lg:w-1/3 flex items-end justify-between flex-row-reverse lg:flex-row lg:pr-16">
            <div class="flex space-x-4">
              <Festival23SwiperButton :id="`prev-${uniqueId}`" />
              <Festival23SwiperButton :id="`next-${uniqueId}`" type="next" />
            </div>
            <Festival23Pagination :go-to-page="handleChangePage" :total-pages="totalPages" :active-page="activePage" />
          </div>
        </Container>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import festivalSwiper from '~/mixins/festivalSwiper'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import festivalRichCards from '~/mixins/festivalRichCards'

export default {
  name: 'Festival23SpotlightCarousel',
  mixins: [layout, livedata, festivalRichCards, festivalSwiper, eventiveEverywhere],
  data () {
    return {
      swiperOverrideOptions: {
        autoHeight: true,
        slidesPerView: 1
      }
    }
  }
}
</script>

<style scoped>

</style>
