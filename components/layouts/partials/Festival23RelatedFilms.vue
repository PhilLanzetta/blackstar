<template>
  <div v-if="films.length">
    <Space class="hidden lg:block" :md="true" />
    <Space class="block lg:hidden" />
    <Space class="block lg:hidden" />
    <div class="absolute left-0 top-auto border-t-2 border-black w-full" />
    <Space class="hidden lg:block" :md="true" />
    <Space class="block lg:hidden" />
    <Space class="block lg:hidden" />
    <Container>
      <Festival23H2 size="lg">
        You may also like
      </Festival23H2>
      <Space :sm="true" />
      <Space :sm="true" />
    </Container>
    <ClientOnly>
      <FestivalRichCardCarouselWrapper>
        <Container>
          <swiper ref="swiper" :options="swiperOptions">
            <swiper-slide v-for="(film, key) in films" :key="`card${key}`">
              <Festival23RichCard :card="{type: 'festival-film', film: film}" :section-colour="sectionColour" />
            </swiper-slide>
          </swiper>

          <Space />

          <div class="flex justify-end lg:justify-between space-x-4 lg:space-x-0">
            <Festival23SwiperButton :id="`prev-${uniqueId}`" class="flex-grow-0" />

            <Festival23Pagination
              class="hidden lg:block"
              :go-to-page="handleChangePage"
              :total-pages="totalPages"
              :active-page="activePage"
            />

            <Festival23SwiperButton :id="`next-${uniqueId}`" class="flex-grow-0" type="next" />
          </div>
          <Space class="block lg:hidden" />
          <Space class="block lg:hidden" />
        </Container>
      </FestivalRichCardCarouselWrapper>
    </ClientOnly>
  </div>
</template>

<script>
import Festival23SectionColors from '~/mixins/festival23SectionColors'
import festivalSwiper from '~/mixins/festivalSwiper'

export default {
  name: 'Festival23RelatedFilms',
  mixins: [Festival23SectionColors, festivalSwiper],
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      films: [],
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
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1920: {
            slidesPerView: 3.5,
            spaceBetween: 20
          }
        }
      }
    }
  },
  async fetch () {
    const endpoint = '/wp-json/wp/v2/festival-film'

    try {
      const tags = this.film.tags.map((tag) => {
        return tag.term_id
      })
      const query = (tags.length ? `&eventive-tag=${tags.join(',')}` : '')
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}${endpoint}?per_page=9&_year=${this.film.acf.festival_year}&rich=1&exclude=${this.film.id}` + query, this.$axiosConfig.config)
      if (response.status === 200) {
        this.films = response.data
      }
    } catch (e) {
      //
    }
  }
}
</script>

<style scoped>

</style>
