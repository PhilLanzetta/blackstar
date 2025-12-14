<template>
  <section v-if="items&&items.length" class="sponsor-carousel bg-teal text-white overflow-hidden">
    <Container>
      <Space :md="true" />
      <div class="md:flex justify-between items-center border-b-2 pb-8 mb-8 border-white border-dotted">
        <h2 class="secondary-heading md:mb-0" v-if="layout.title" v-html="layout.title">
        </h2>

        <CircleButton v-if="layout.button" :to="layout.button.url|replaceSiteUrl" class="hidden md:block" color-scheme="white">
          <span v-html="layout.button.title"></span>
        </CircleButton>
      </div>
      <ClientOnly>
        <LazyLogoCarousel :arrow-prev="$refs.arrowPrev" :arrow-next="$refs.arrowNext">
          <swiper-slide v-for="sponsor in items" :key="`sponsor${sponsor.id}`">
            <span class="sponsor">
              <a v-cursor-interact :href="sponsor.acf.website" target="_blank" rel="noreferrer" v-html="sponsor.acf.logo" />
            </span>
          </swiper-slide>
        </LazyLogoCarousel>
      </ClientOnly>
      <div class="block md:hidden">
        <Space />
        <CircleButton  v-if="layout.button" :to="layout.button.url|replaceSiteUrl" color-scheme="white">
          <span v-html="layout.button.title"></span>
        </CircleButton>
      </div>
      <Space :md="true" />
    </Container>
  </section>
</template>

<script>
import livedata from '~/mixins/livedata'
import layout from '~/mixins/layout'

export default {
  name: 'SponsorsCarousel',
  mixins: [layout, livedata],
  async fetch () {
    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/sponsor?per_page=100&sponsor-collection=${this.layout.sponsor_collection}&orderby=menu_order&order=asc`)
  }
}
</script>

<style>
.sponsor-carousel .swiper-slide {
  width: auto !important;
}

.sponsor-carousel .swiper-slide .sponsor {
  @apply block px-6;
}
</style>
