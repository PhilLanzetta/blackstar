<template>
  <section class="relative" :class="{'bg-beige': layout.display==='carousel'&&$store.state.theme==='festival'}">
    <div class="overflow-hidden">
      <Space v-if="layout.display==='carousel'" :md="true" />
      <Container>
        <div class="flex items-end justify-between" :class="{'mb-4': $store.state.theme==='festival', 'lg:-mb-5 2xl:-mb-10': $store.state.theme=='bsf11'}">
          <div class="w-full max-w-lg" :class="{'mt-auto': $store.state.theme==='bsf11'}">
            <FestivalHeading
              v-if="layout.title"
              background-class="bg-blue text-white"
            >
              <span v-html="layout.title" />
            </FestivalHeading>
          </div>
          <div v-if="layout.display==='carousel'" class="flex" :class="{'space-x-5 2xl:space-x-12 text-navy mb-5': $store.state.theme==='festival', 'text-bsf11Yellow  mb-4 2xl:mb-8': $store.state.theme==='bsf11'}">
            <button :id="`previous-${uniqueId}`" ref="arrowPostsPrev">
              <FestivalPrevArrow />
            </button>
            <button :id="`next-${uniqueId}`" ref="arrowPostsNext">
              <FestivalNextArrow />
            </button>
          </div>
        </div>
        <Space v-if="layout.title&&$store.state.theme!=='bsf11'" :md="true" />
      </Container>
      <hr
        v-if="$store.state.theme==='bsf11'&&layout.display!=='carousel'"
        class="block border-0 border-t-5 border-dotted border-bsf11Teal bg-transparent mb-10"
      >

      <Container>
        <template v-if="layout.display==='carousel'">
          <ClientOnly>
            <PostsCarousel :arrow-next="`#next-${uniqueId}`" :arrow-previous="`#previous-${uniqueId}`">
              <swiper-slide v-for="(article, key) in layout.listing_articles" :key="`articleListingCarousel${key}`">
                <ListingFestivalManual class="relative z-1" :article="article" :carousel="true" />
              </swiper-slide>
            </PostsCarousel>
          </ClientOnly>
        </template>
        <template v-if="layout.display==='grid'">
          <div class="listing-grid" :class="{'listing-grid--lg': $store.state.theme==='bsf11'}">
            <div
              v-for="(article, key) in layout.listing_articles"
              :key="`articleListingGrid${key}`"
              class="listing-grid__item"
            >
              <ListingFestivalManual
                :article="article"
              />
            </div>
          </div>
        </template>
      </Container>
      <Space v-if="layout.display==='carousel'" :md="true" />
    </div>
    <template v-if="layout.display==='grid'">
      <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape1" class="top-0 left-1/5 z-0">
        <ShapeOne />
      </LazyRellaxShape>
      <LazyRellaxShape
        v-if="$store.state.theme==='bsf11'"
        key="shapeAsterix"
        class="top-0 hidden lg:block left-10 z-0 w-16 xl:w-32 z-20"
      >
        <ShapeAsterix2 />
      </LazyRellaxShape>
    </template>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeOne from '~/assets/festival/shape-1.svg?inline'
import ShapeAsterix2 from '~/assets/festival/11/shape-asterix-2.svg?inline'

export default {
  name: 'FestivalListingArticles',
  components: { ShapeOne, ShapeAsterix2 },
  mixins: [layout],
  computed: {
    uniqueId () {
      return this._uid
    }
  }
}
</script>

<style scoped>

</style>
