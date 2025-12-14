<template>
  <Container :itemscope="isEvent" :itemtype="(isEvent ? 'https://schema.org/ScreeningEvent' : false)">
    <div class="lg:flex lg:space-x-16 space-y-8 lg:space-y-0">
      <div class="lg:w-1/3 space-y-4 lg:space-y-8">
        <Festival23RichCardContent :card="card" size="xl" />
        <Festival23RichCardButtons :card="card" />
      </div>
      <div class="lg:w-2/3">
        <Festival23BoxMask>
          <div class="w-full aspect-w-10 aspect-h-10 md:aspect-w-16 md:aspect-h-9">
            <Festival23RichCardMedia :card="card" size="hero-card" />
          </div>
          <RawLink v-if="cardMainLink" class-names="absolute top-0 left-0 w-full h-full z-20" :to="cardMainLink|replaceSiteUrl">
            <span class="sr-only">Read more</span>
          </RawLink>
        </Festival23BoxMask>
      </div>
    </div>
  </Container>
</template>

<script>
import hasRichCardLinks from '~/mixins/hasRichCardLinks'

export default {
  name: 'Festival23SpotlightRichCard',
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
