<template>
  <article class="festival-event" :class="`festival-event--${$store.state.theme}`">
    <div class="festival-event__inside">
      <NuxtLink v-cursor-hint="'View'" :to="`/festival/venues/${venue.slug}`">
        <span class="aspect-cover-img">
          <span v-if="venue.acf.image" v-html="venue.acf.image" /><span
            v-if="!venue.acf.image"
          ><img
            v-if="$store.state.theme==='festival'"
            src="~/assets/festival/default-image.png"
            alt=""
          ><img
            v-if="$store.state.theme==='bsf11'"
            src="~/assets/festival/11/default-image.png"
            alt=""
          ></span>
        </span>
        <span v-if="venue.acf.sticker" class="festival-event__badge"><ShapeBadge
          v-if="$store.state.theme==='bsf11'"
        /><span>{{ venue.acf.sticker }}</span></span>
      </NuxtLink>
      <header>
        <span v-if="venue.acf.hotel||venue.acf.virtual" class="block font-festival_sans_light_italic text-xs mb-0.5">
          <template v-if="venue.acf.hotel">Hotel</template>          <template v-if="venue.acf.virtual">Virtual</template>
        </span>
        <h1 class="mb-1" :class="{'secondary-heading': $store.state.theme==='festival'}" itemprop="name" v-html="venue.name" />
        <h2 v-if="venue.acf.sub_heading" v-html="venue.acf.sub_heading" />
      </header>
    </div>

    <div class="festival-event__inside__content">
      <span itemprop="description" v-html="venue.description" />
    </div>
    <footer class="flex space-x-2 mt-6 swiper-no-swiping">
      <FestivalButton :to="`/festival/venues/${venue.slug}`" :alt="true">
        Read More
      </FestivalButton>
      <FestivalButton v-if="venue.acf.button" :to="venue.acf.button[0].link|replaceSiteUrl">
        {{ venue.acf.button[0].label }}
      </FestivalButton>
    </footer>
  </article>
</template>

<script>

import ShapeBadge from '~/assets/festival/11/badge.svg?inline'

export default {
  name: 'ListingFestivalVenue',
  components: { ShapeBadge },
  props: {
    venue: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.venue img {
  @apply w-full block;
}
</style>
