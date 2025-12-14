<template>
  <div v-show="films&&films.length" class="rounded-t-3xl z-10 relative" :class="{'border-t border-x bg-beige': $store.state.theme === 'bsf13', 'bg-gradient-to-b from-bsf14yellowTint to-bsf14yellow': $store.state.theme ==='bsf14'}">
    <Space />
    <Space />
    <Space />
    <Container>
      <Festival24Heading :layout="{'heading': 'You may also like'}" />
    </Container>
    <Space />
    <Space />
    <Space />
    <ClientOnly>
      <FestivalRichCardCarouselWrapper>
        <Container>
          <swiper ref="swiper" :options="swiperOptions">
            <swiper-slide v-for="(filmSlide, key) in films" :key="`card${key}`">
              <Festival24RichCard :card="{type: 'festival-film', film: filmSlide}" background="offWhite" />
            </swiper-slide>
          </swiper>

          <Space />

          <div class="flex justify-between space-x-4 lg:space-x-0 items-center">
            <Festival24SwiperButton :id="`prev-${uniqueId}`" class="flex-grow-0" />

            <Festival24Pagination
              class="hidden lg:block"
              :go-to-page="handleChangePage"
              :total-pages="totalPages"
              :active-page="activePage"
            />

            <Festival24SwiperButton :id="`next-${uniqueId}`" class="flex-grow-0" type="next" />
          </div>
          <Space />
          <Space />
          <Space />
          <Space />
          <Space />
          <Space />
        </Container>
      </FestivalRichCardCarouselWrapper>
    </ClientOnly>
  </div>
</template>

<script>
import festivalSwiper from '~/mixins/festivalSwiper'

export default {
  name: 'Festival24RelatedFilms',
  mixins: [festivalSwiper],
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
            slidesPerView: 1.25,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 2.25,
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
