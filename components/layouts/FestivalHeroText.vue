<template>
  <section>
    <Container>
      <Space :lg="true" />
      <div class="relative">
        <div id="festival-hero-text" :class="`hero-text hero-text--${$store.state.theme} ` + (layout.alternative_shapes ? ' hero-text--alt ' :'')">
          <div class="relative z-10" v-html="layout.content" />
          <LazyRellaxShape
            v-if="$store.state.theme==='festival'"
            key="shape1"
            class="xl:-top-60 xl:-left-60 -top-10 left-0 z-0 w-2/6 xl:w-auto"
            :speed="-4"
          >
            <ShapeOne v-if="!layout.alternative_shapes" />
            <ShapeThree v-if="layout.alternative_shapes" />
          </LazyRellaxShape>
          <LazyRellaxShape
            v-if="$store.state.theme==='festival'"
            key="shape2"
            class="bottom-0 xl:-bottom-40 right-0 xl:-right-20 z-0 w-2/5 xl:w-80"
          >
            <ShapeTwo v-if="!layout.alternative_shapes" />
            <ShapeFour v-if="layout.alternative_shapes" />
          </LazyRellaxShape>
        </div>
        <LazyRellaxShape
          v-if="$store.state.theme==='bsf11'&&!layout.alternative_shapes"
          key="shapeStar"
          class="xl:-top-36 3xl:-right-64 -top-10 right-1/4 -mr-32 3xl:mr-0 z-0 w-2/6 xl:w-3/12"
          :speed="-4"
        >
          <ShapeStar />
        </LazyRellaxShape>
        <LazyRellaxShape v-if="$store.state.theme==='bsf11'&&layout.alternative_shapes" key="shapeFlower" class="hidden lg:block top-0 right-0 z-0 w-full max-w-xs">
          <ShapeFlower />
        </LazyRellaxShape>
        <LazyRellaxShape v-if="$store.state.theme==='bsf11'&&layout.alternative_shapes" key="shapeStarAlt" class="hidden lg:block -top-64 right-1/2 z-0 w-full max-w-sm">
          <ShapeStarAlt />
        </LazyRellaxShape>
        <Space v-if="$store.state.theme==='festival'" :lg="true" />
      </div>
    </Container>
  </section>
</template>

<script>
import ShapeOne from '~/assets/festival/shape-1.svg?inline'
import ShapeTwo from '~/assets/festival/shape-2.svg?inline'
import ShapeThree from '~/assets/festival/shape-3.svg?inline'
import ShapeFour from '~/assets/festival/shape-4.svg?inline'
import ShapeStar from '~/assets/festival/11/shape-star.svg?inline'
import ShapeFlower from '~/assets/festival/11/shape-flower.svg?inline'
import ShapeStarAlt from '~/assets/festival/11/shape-star-alt.svg?inline'
import layout from '~/mixins/layout'

export default {
  name: 'FestivalHeroText',
  components: {
    ShapeOne,
    ShapeTwo,
    ShapeThree,
    ShapeFour,
    ShapeStar,
    ShapeFlower,
    ShapeStarAlt
  },
  mixins: [layout]
}
</script>

<style>
.hero-text {
  @apply text-2xl sm:text-3xl md:text-4xl xl:text-5xl mx-auto relative z-10;
}

.hero-text--festival {
  @apply font-festival_sans_light_italic text-navy  max-w-4xl;
}

.hero-text--bsf11 {
  @apply max-w-none bg-bsf11Yellow rounded-3xl xl:rounded-4xl border-4 lg:border-md 2xl:border-lg border-black py-8 xl:py-16 px-8 text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl;
}

.hero-text p, .hero-text li {
  @apply leading-tight;
}

.hero-text strong {
  @apply font-festival_sans font-normal;
}

.hero-text--bsf11.hero-text--alt {
  @apply bg-transparent rounded-none border-0 p-0 font-bsf11_sans text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl not-italic;
}

.hero-text--bsf11.hero-text--alt em {
  @apply not-italic;
}

.hero-text--bsf11.hero-text--alt p {
  @apply leading-overlap;
}
</style>
