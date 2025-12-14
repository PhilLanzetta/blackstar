<template>
  <section class="relative">
    <Container>
      <Space :md="true" />
      <div class="relative">
        <LazyRellaxShape v-if="$store.state.theme==='festival'" key="shape1" class="top-0 left-1/4 z-0">
          <ShapeOne />
        </LazyRellaxShape>
        <div class="overflow-hidden">
          <FestivalHeading v-if="$store.state.theme==='bsf11'" :butted="true">
            <span v-html="heading"></span>
          </FestivalHeading>
          <div class="listing-grid">
            <div v-for="film in films" :key="`film${film.ID}`" class="listing-grid__item">
              <ListingFestivalFilm :film="film" />
            </div>
          </div>
        </div>
        <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeStar" class="top-1/3 right-0 max-w-md mr-20 z-0">
          <ShapeStar />
        </LazyRellaxShape>
      </div>
    </Container>
    <LazyRellaxShape v-if="$store.state.theme==='bsf11'" key="shapeSquiggle5" class="top-0 mt-32 w-40 ml-32 left-0 z-0">
      <ShapeSquiggle5 />
    </LazyRellaxShape>
  </section>
</template>

<script>
import ShapeOne from '~/assets/festival/shape-1.svg?inline'
import ShapeSquiggle5 from '~/assets/festival/11/shape-squiggle5.svg?inline'
import ShapeStar from '~/assets/festival/11/shape-star.svg?inline'

export default {
  name: 'FestivalEventFilmListings',
  components: { ShapeOne, ShapeSquiggle5, ShapeStar },
  props: {
    films: {
      type: Array,
      required: true
    },
    heading: {
      type: String,
      required: true,
      default: 'Program'
    }
  }
}
</script>

<style scoped>

</style>
