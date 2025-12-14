<template>
  <div class="relative">
    <section class="sponsor-carousel overflow-hidden" :class="{'bg-navy': $store.state.theme==='festival'}">
      <Space :md="true" />
      <Container class="relative z-10">
        <div class="flex items-end justify-between mb-12">
          <div v-if="$store.state.theme==='festival'" class="w-full max-w-lg">
            <FestivalHeading v-if="layout.title" border-class="border-pink" background-class="bg-lime text-navy">
              {{ layout.title }}
            </FestivalHeading>
            <FestivalActionHeading
              v-if="layout.action"
              :to="layout.action.url|replaceSiteUrl"
              border-class="border-pink"
              :butted="true"
              :force-flex="true"
            >
              <span class="xl:px-4 xl:text-lg">{{ layout.action.title }}</span>
            </FestivalActionHeading>
          </div>
          <div v-if="$store.state.theme==='bsf11'" class="2xl:max-w-2xl">
            <h2 class="text-5xl lg:text-6xl 2xl:text-7xl font-bsf11_sans" v-html="layout.title" />
            <h3 v-if="layout.description" class="text-base sm:text-lg md:text-xl lg:text-2xl mt-8" :class="{'text-lime': $store.state.theme==='festival'}">
              {{ layout.description }}
            </h3>
            <div v-if="layout.action" class="mt-8">
              <FestivalButton :to="layout.action.url|replaceSiteUrl">
                <span v-html="layout.action.title" />
              </FestivalButton>
            </div>
          </div>
          <div class="flex" :class="{'text-lime mb-5 space-x-6 2xl:space-x-12': $store.state.theme==='festival', 'text-bsf11Teal': $store.state.theme==='bsf11'}">
            <button ref="arrowPrev">
              <FestivalPrevArrow />
            </button>
            <button ref="arrowNext">
              <FestivalNextArrow />
            </button>
          </div>
        </div>
        <h3 v-if="layout.description&&$store.state.theme==='festival'" class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl m-0" :class="{'text-lime': $store.state.theme==='festival'}">
          {{ layout.description }}
        </h3>
      </Container>
      <hr v-if="$store.state.theme==='bsf11'" class="block border-0 border-t-5 border-dotted border-bsf11Teal bg-transparent mb-10">
      <Container class="relative z-10">
        <hr v-if="$store.state.theme==='festival'" class="block h-1.5 rounded bg-white my-4">

        <ClientOnly>
          <LazyLogoCarousel :arrow-prev="$refs.arrowPrev" :arrow-next="$refs.arrowNext">
            <swiper-slide v-for="sponsor in items" :key="`sponsor${sponsor.id}`">
              <span class="sponsor">
                <a v-cursor-interact :href="sponsor.acf.website" target="_blank" rel="noreferrer" v-html="sponsor.acf.logo" />
              </span>
            </swiper-slide>
          </LazyLogoCarousel>
        </ClientOnly>
      </Container>
      <Space :md="true" />
    </section>
    <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeElipseChain" class="hidden lg:block -top-20 left-1/2 -ml-64 z-0 w-full max-w-2xl">
      <ShapeElipseChain />
    </LazyRellaxShape>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import livedata from '~/mixins/livedata'
import ShapeElipseChain from '~/assets/festival/11/shape-elipse-chain.svg?inline'

export default {
  name: 'FestivalSponsorsCarousel',
  components: { ShapeElipseChain },
  mixins: [layout, livedata],
  async fetch () {
    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/sponsor?per_page=100&sponsor-collection=${this.layout.sponsor_collection}&orderby=menu_order&order=asc`)
  }
}
</script>

<style>
.swiper-button-disabled {
  @apply text-white pointer-events-none;
}

.sponsor-carousel .swiper-wrapper {
  justify-content: space-between;
}

.sponsor-carousel .swiper-slide {
  width: auto !important;
}

.sponsor-carousel .swiper-slide .sponsor {
  @apply block px-6;
}

</style>
