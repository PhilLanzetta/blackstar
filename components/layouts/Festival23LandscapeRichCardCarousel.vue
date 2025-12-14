<template>
  <ClientOnly>
    <FestivalRichCardCarouselWrapper>
      <Container>
        <swiper ref="swiper" :options="swiperOptions">
          <swiper-slide v-for="(card, key) in cards" :key="`card${key}`">
            <Festival23LandscapeRichCard :card="card" :section-colour="sectionColour" />
          </swiper-slide>
        </swiper>

        <Space />

        <div class="flex justify-end lg:justify-between space-x-4 lg:space-x-0">
          <Festival23SwiperButton :id="`prev-${uniqueId}`" class="flex-grow-0" />

          <Festival23Pagination class="hidden lg:block" :go-to-page="handleChangePage" :total-pages="totalPages" :active-page="activePage" />

          <Festival23SwiperButton :id="`next-${uniqueId}`" class="flex-grow-0" type="next" />
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
  name: 'Festival23LandscapeRichCardCarousel',
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
