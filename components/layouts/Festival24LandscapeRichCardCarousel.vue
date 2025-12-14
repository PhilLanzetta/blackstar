<template>
  <ClientOnly>
    <FestivalRichCardCarouselWrapper>
      <Container>
        <swiper ref="swiper" :options="swiperOptions">
          <swiper-slide v-for="(card, key) in cards" :key="`card${key}`">
            <Festival24Box class="h-full" :background="(layout.background ? layout.background : null)" :gradient-style="(layout.gradient_style ? layout.gradient_style : null)">
              <div class="lg:flex justify-between space-y-4 lg:space-y-0 lg:space-x-8 lg:h-full">
                <div class="lg:w-1/2 flex flex-col justify-between">
                  <Festival24RichCardContent :card="card" size="lg" />
                  <Festival24RichCardButtons :card="card" />
                </div>
                <div class="lg:w-1/2">
                  <Festival24RichCardMedia :card="card" class="aspect-w-10 aspect-h-10 !h-auto" />
                </div>
              </div>
            </Festival24Box>
          </swiper-slide>
        </swiper>

        <Space />

        <div class="flex justify-end lg:justify-between space-x-4 lg:space-x-0">
          <Festival24SwiperButton :id="`prev-${uniqueId}`" class="flex-grow-0" />

          <Festival24Pagination class="hidden lg:block" :go-to-page="handleChangePage" :total-pages="totalPages" :active-page="activePage" />

          <Festival24SwiperButton :id="`next-${uniqueId}`" class="flex-grow-0" type="next" />
        </div>
      </Container>
    </FestivalRichCardCarouselWrapper>
  </ClientOnly>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import festivalSwiper from '~/mixins/festivalSwiper'
import festival23SectionColors from '~/mixins/festival23SectionColors'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'
import festivalRichCards from '~/mixins/festivalRichCards'

export default {
  name: 'Festival24LandscapeRichCardCarousel',
  mixins: [layout, livedata, festivalRichCards, festivalSwiper, festival23SectionColors, eventiveEverywhere],
  data () {
    return {
      swiperOverrideOptions: {
        slidesPerView: 1.05,
        spaceBetween: 10,
        breakpoints: {
          460: {
            slidesPerView: 1.5,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 1.25,
            spaceBetween: 20
          },
          1920: {
            slidesPerView: 1.5,
            spaceBetween: 20
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
