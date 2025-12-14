<template>
  <section v-show="events&&events.length" :class="{'bg-yellow': $store.state.theme==='festival'}" class=" relative z-10 overflow-hidden ">
    <div class="overflow-hidden  relative z-10">
      <Space :md="true" />
      <Container>
        <div class="flex items-end justify-between" :class="{'mb-4': $store.state.theme==='festival', 'lg:-mb-5 2xl:-mb-10': $store.state.theme=='bsf11'}">
          <div class="w-full"  :class="{'mt-auto': $store.state.theme==='bsf11'}">
            <FestivalHeading background-class="bg-pink">
              You may like
            </FestivalHeading>
          </div>
          <div class="flex"  :class="{'space-x-5 2xl:space-x-12 text-navy mb-5': $store.state.theme==='festival', 'text-bsf11Yellow mb-4 2xl:mb-8': $store.state.theme==='bsf11'}">
            <button id="`previous-${uniqueId}`" ref="arrowPostsPrev">
              <FestivalPrevArrow />
            </button>
            <button :id="`next-${uniqueId}`" ref="arrowPostsNext">
              <FestivalNextArrow />
            </button>
          </div>
        </div>
        <Space v-if="$store.state.theme==='festival'" :md="true" />
        <ClientOnly>
          <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
            <swiper-slide v-for="event in events" :key="`relatedEvent${event.id}`">
              <ListingFestivalEvent class="relative z-1" :post="event" />
            </swiper-slide>
          </PostsCarousel>
        </ClientOnly>
      </Container>
      <Space :md="true" />
      <Space :lg="true" v-if="$store.state.theme==='bsf11'" />

    </div>
    <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape6" :speed="-4" class="-top-32 right-1/3 z-10 w-60">
      <ShapeSix />
    </LazyRellaxShape>
    <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeStar" class="top-1/4 left-1/4 -mr-10 max-w-md z-0">
      <ShapeStar />
    </LazyRellaxShape>
  </section>
</template>

<script>
import ShapeSix from '~/assets/festival/shape-6.svg?inline'
import ShapeStar from '~/assets/festival/11/shape-star.svg?inline'

export default {
  name: 'FestivalEventRelated',
  components: { ShapeSix, ShapeStar },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
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
