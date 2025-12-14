<template>
  <Container :itemscope="isEvent" :itemtype="(isEvent ? 'https://schema.org/ScreeningEvent' : false)">
    <div class="lg:flex lg:space-x-16 items-stretch min-h-[600px]">
      <div class="lg:w-2/5 flex items-stretch">
        <Festival24Box>
          <Festival24RichCardContent :card="card" size="xl" />
          <Festival24RichCardButtons :card="card" />
          <Space /><Space /><Space /><Space /><Space /> <!-- Space for pagination -->
        </Festival24Box>
      </div>
      <div class="lg:w-3/5">
        <div class="relative w-full h-full">
          <Festival24RichCardMedia :card="card" size="hero-card" />
          <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
            <span class="sr-only">Read more</span>
          </RawLink>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival24SpotlightRichCard',
  mixins: [hasRichCardLinks],
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
