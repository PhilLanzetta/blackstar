<template>
  <section class="relative">
    <Container>
      <FestivalHeading v-if="layout.title" :butted="$store.state.theme==='bsf11'" background-class="bg-pink">
        {{ layout.title }}
      </FestivalHeading>
      <Space />
      <div class="listing-grid">
        <template v-if="$store.state.theme==='festival'">
          <LazyRellaxShape key="shape1" class="top-0 left-1/5 z-0">
            <ShapeOne />
          </LazyRellaxShape>
          <LazyRellaxShape v-if="layout.venues.length>6" key="shape2" class="top-1/3 right-1/4 z-0" :speed="-4">
            <ShapeTwo />
          </LazyRellaxShape>
          <LazyRellaxShape v-if="layout.venues.length>8" key="shape3" class="top-2/3 left-1/4 z-0 w-60" :speed="-4">
            <ShapeThree />
          </LazyRellaxShape>
        </template>
        <div v-for="venue in layout.venues" :key="`venue${venue.term_id}`" class="listing-grid__item">
          <ListingFestivalVenue :venue="venue" />
        </div>
        <LazyRellaxShape v-if="$store.state.theme==='bsf11'&&layout.venues.length<3" key="shapeStar" class="top-0 right-0 max-w-md mr-20 z-0">
          <ShapeStar />
        </LazyRellaxShape>
        <LazyRellaxShape v-if="$store.state.theme==='bsf11'&&layout.venues.length>3" key="shapeStar" class="top-0 right-0 max-w-xl mr-20 z-0">
          <ShapElipseChain />
        </LazyRellaxShape>
      </div>
      <LazyRellaxShape v-if="$store.state.theme==='bsf11'&&layout.venues.length>3" key="shapeSquiggle5" class="top-0 mt-32 w-40 ml-32 left-0 z-0">
        <ShapeSquiggle5 />
      </LazyRellaxShape>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeOne from '~/assets/festival/shape-1.svg?inline'
import ShapeTwo from '~/assets/festival/shape-2.svg?inline'
import ShapeThree from '~/assets/festival/shape-5.svg?inline'
import ShapeSquiggle5 from '~/assets/festival/11/shape-squiggle5.svg?inline'
import ShapeStar from '~/assets/festival/11/shape-star.svg?inline'
import ShapElipseChain from '~/assets/festival/11/shape-elipse-chain.svg?inline'

export default {
  name: 'FestivalVenuesHotels',
  components: { ShapeOne, ShapeTwo, ShapeThree, ShapeSquiggle5, ShapeStar, ShapElipseChain },
  mixins: [layout]
}
</script>

<style scoped>

</style>
