<template>
  <div class="relative bg-seenOrange text-black" :style="customStyles">
    <Container>
      <div class="lg:flex justify-between lg:space-x-20 pb-10 lg:py-10 items-center">
        <div class="lg:w-6/12 pt-10 lg:py-10 seen-spotlight-content" v-html="layout.text">
        </div>
        <div class="lg:w-4/12" v-html="layout.image">
        </div>
      </div>
    </Container>
    <RawLink v-cursor-hint="layout.link.title" :to="layout.link.url|replaceSiteUrl" class-names="absolute top-0 left-0 w-full h-full z-10"></RawLink>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenSpotlight',
  mixins: [layout],
  computed: {
    customStyles () {
      return (this.layout.background_colour ? ` background-color: ${this.layout.background_colour}; ` : '') + (this.layout.foreground_colour ? ` color: ${this.layout.foreground_colour}; ` : '')
    }
  }
}
</script>

<style>
.seen-spotlight-content {
  @apply text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-seen_serif_light mb-4;
}

.seen-spotlight-content small {
  @apply text-lg md:text-xl xl:text-2xl;
}

.seen-spotlight-content em,
.seen-spotlight-content i {
  @apply font-seen_serif_light_italic;
}
</style>
