<template>
  <section class="overflow-hidden" :class="{'bg-yellow': $store.state.theme==='festival'}">
    <Space :md="true" />
    <Container>
      <div class="flex items-end justify-between" :class="{'mb-4': $store.state.theme==='festival', 'lg:-mb-5 2xl:-mb-10': $store.state.theme==='bsf11'}">
        <div v-if="layout.title" class="w-full max-w-lg" :class="{'mt-auto': $store.state.theme==='bsf11'}">
          <FestivalHeading background-class="bg-pink">
            <span v-html="layout.title" />
          </FestivalHeading>
        </div>
        <div class="flex" :class="{'space-x-5 2xl:space-x-12 text-navy mb-5': $store.state.theme==='festival', 'text-bsf11Yellow mb-4 2xl:mb-8': $store.state.theme==='bsf11'}">
          <button :id="`previous-${uniqueId}`" ref="arrowVenuesPrev">
            <FestivalPrevArrow />
          </button>
          <button :id="`next-${uniqueId}`" ref="arrowVenuesNext">
            <FestivalNextArrow />
          </button>
        </div>
      </div>
      <Space :md="true" />
      <ClientOnly>
        <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
          <swiper-slide v-for="venue in layout.venues" :key="`relatedVenue${venue.term_id}`">
            <ListingFestivalVenue :venue="venue" />
          </swiper-slide>
        </PostsCarousel>
      </ClientOnly>
    </Container>
    <Space :md="true" />
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'FestivalVenuesCarousel',
  mixins: [layout],
  computed: {
    uniqueId () {
      return this._uid
    }
  }
}
</script>

<style scoped>
.swiper-button-disabled {
  @apply text-white pointer-events-none;
}
</style>
