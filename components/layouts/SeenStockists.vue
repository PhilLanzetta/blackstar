<template>
  <Container>
    <SeenHeadingLarge :heading="layout.heading" />
    <ul class="stockist-locations lg:flex flex-wrap lg:-mx-8">
      <li class="lg:px-8 mb-8 lg:w-1/5" v-for="(location, locationKey) in layout.locations" :key="`location${locationKey}`">
       <h3 v-html="location.location_name"></h3>
        <ul class="stockist-locations__stockists">
          <li v-for="(stockist, stockistKey) in location.stockists" :key="`location${locationKey}Stockist${stockistKey}`"><SiteLink :to="stockist.link.url"><span v-html="stockist.name"></span></SiteLink></li>
        </ul>
      </li>
    </ul>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenStockists',
  mixins: [layout]
}
</script>

<style>
.stockist-locations li {
  @apply text-lg font-seen_serif_light_italic;
}

.stockist-locations li h3 {
  @apply font-seen_serif_light mb-2;
}

.stockist-locations__stockists li {
  @apply mb-2;
}

.stockist-locations__stockists a {
  @apply underline underline-offset-4;
}

.stockist-locations li strong {
  @apply font-seen_serif_light block;
}
</style>
