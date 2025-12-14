<template>
  <div v-if="events.length" class="rounded-t-3xl z-10 relative -mb-16" :class="{' border-t border-x bg-bsf13purple': $store.state.theme === 'bsf13', 'bg-gradient-to-b from-bsf14yellowTint to-bsf14yellow': $store.state.theme ==='bsf14'&&modifier==='film-guide', 'bg-gradient-to-b from-bsf14orange to-bsf14orangeTint': $store.state.theme ==='bsf14'&&modifier!=='film-guide'}">
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
            <swiper-slide v-for="(event, key) in events" :key="`card${key}`">
              <Festival24RichCard :card="{type: 'festival-event', event: event}" :background="($store.state.theme==='bsf14' ? 'offWhite' : null)" />
            </swiper-slide>
          </swiper>

          <Space />
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
import Festival23SectionColors from '~/mixins/festival23SectionColors'
import festivalSwiper from '~/mixins/festivalSwiper'

export default {
  name: 'Festival24RelatedEvents',
  mixins: [Festival23SectionColors, festivalSwiper],
  props: {
    event: {
      type: Object,
      required: true
    },
    modifier: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  data () {
    return {
      events: [],
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
    if (this.event.acf.related_events && this.event.acf.related_events.length) {
      this.events = this.event.acf.related_events
      return
    }
    const endpoint = '/wp-json/wp/v2/festival-event'

    try {
      const tags = this.event.tags.map((tag) => {
        return tag.term_id
      })
      const query = (tags.length ? `&eventive-tag=${tags.join(',')}` : '')
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}${endpoint}?per_page=9&_year=${this.event.acf.festival_year}&rich=1&exclude=${this.event.id}&in-person=1` + query, this.$axiosConfig.config)
      if (response.status === 200) {
        this.events = response.data
      }
    } catch (e) {
      //
    }
  }
}
</script>

<style scoped>

</style>
