<template>
  <section class="relative overflow-hidden" :class="{'bg-yellow': $store.state.theme==='festival'}">
    <div class="overflow-hidden relative z-10">
      <Space :md="true" />
      <Container>
        <div class="flex items-end justify-between" :class="{'mb-4': $store.state.theme==='festival', 'lg:-mb-5 2xl:-mb-10': $store.state.theme=='bsf11'}">
          <div class="w-full max-w-lg" :class="{'mt-auto': $store.state.theme==='bsf11'}">
            <FestivalHeading v-if="layout.title" background-class="bg-pink">
              <span v-html="layout.title" />
            </FestivalHeading>
            <template v-if="$store.state.theme==='festival'">
              <FestivalActionHeading
                v-for="(action, key) in layout.action"
                :key="`action${key}`"
                :to="action.link.url|replaceSiteUrl"
                :butted="true"
                :force-flex="true"
              >
                <span class="xl:px-4 xl:text-lg" v-html="action.label" />
              </FestivalActionHeading>
            </template>
          </div>
          <div class="flex" :class="{'space-x-5 2xl:space-x-12 text-navy mb-5': $store.state.theme==='festival', 'text-bsf11Yellow mb-4 2xl:mb-8': $store.state.theme==='bsf11'}">
            <button :id="`previous-${uniqueId}`" ref="arrowPostsPrev">
              <FestivalPrevArrow />
            </button>
            <button :id="`next-${uniqueId}`" ref="arrowPostsNext">
              <FestivalNextArrow />
            </button>
          </div>
        </div>
        <Space v-if="$store.state.theme==='festival'" :md="true" />
        <ClientOnly>
          <LazyPostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
            <swiper-slide v-for="event in events" :key="`carouselEvent${event.id}`">
              <ListingFestivalEvent class="relative z-1" :post="event" :carousel="true" />
            </swiper-slide>
          </LazyPostsCarousel>
        </ClientOnly>
      </Container>
      <div v-if="$store.state.theme==='bsf11'" class="mt-8 flex justify-center flex-wrap">
        <FestivalButton
          v-for="(action, key) in layout.action"
          :key="`action${key}`"
          :to="action.link.url|replaceSiteUrl"
          :alt="true"
        >
          <span v-html="action.label" />
        </FestivalButton>
      </div>
      <Space :md="true" />
    </div>
    <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape6" class="bottom-1/3 right-0 xl:right-1/4 z-0 w-1/5 xl:w-80">
      <ShapeSix />
    </LazyRellaxShape>
  </section>
</template>

<script>
import livedata from '~/mixins/livedata'
import layout from '~/mixins/layout'
import ShapeSix from '~/assets/festival/shape-6.svg?inline'

export default {
  name: 'FestivalScheduleCarousel',
  components: { ShapeSix },
  mixins: [livedata, layout],
  async fetch () {
    try {
      this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-event?per_page=9&upcoming=1`)
    } catch (e) {
      // console.log(e)
    }
  },
  computed: {
    events () {
      if (this.layout.show_upcoming_events) {
        return this.items
      }

      if (this.layout.events && this.layout.events.length) {
        return this.layout.events
      }

      return this.items
    },
    uniqueId () {
      return this._uid
    }
  },
  methods: {
    loadMore () {

    }
  }
}
</script>

<style scoped>
.swiper-button-disabled {
  @apply text-white pointer-events-none;
}
</style>
