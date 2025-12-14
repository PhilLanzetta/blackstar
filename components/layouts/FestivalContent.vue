<template>
  <section class="relative festival-content" :class="`festival-content--${$store.state.theme}`">
    <Container>
      <FestivalHeading v-if="layout.title" :butted="true" background-class="bg-white text-navy" width-class="w-auto xl:max-w-2xl">
        <span class="festival-content__title" :class="`festival-content__title--${$store.state.theme}`" v-html="layout.title" />
      </FestivalHeading>
      <div class="festival-content__content px-5 py-8 xl:p-8 relative z-20" :class="contentClasses">
        <CursorInteractInside><FestivalProse v-html="layout.content" /></CursorInteractInside>
        <div v-if="layout.buttons && layout.buttons.length" class="flex items-start flex-wrap justify-start mt-8">
          <FestivalButton v-for="(button, key) in layout.buttons" :key="`contentButton${key}`" :to="button.link|replaceSiteUrl" :alt="button.alternative" class="mr-4">
            <span v-html="button.label" />
          </FestivalButton>
        </div>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'FestivalContent',
  mixins: [layout],
  computed: {
    contentClasses () {
      const classes = []

      classes.push(`festival-content__content--${this.$store.state.theme}`)

      if (this.layout.background_colour && this.layout.background_colour !== 'white') {
        if (this.layout.background_colour === 'teal') {
          classes.push('bg-bsf11Teal')
        }

        if (this.layout.background_colour === 'yellow') {
          classes.push('bg-bsf11Yellow')
        }
      } else if (this.$store.state.theme === 'festival') {
        classes.push('bg-beige')
      } else {
        classes.push('bg-white')
      }

      return classes.join(' ')
    }
  }
}
</script>

<style>
.festival-content__title em, .festival-content__title i {
  @apply font-festival_sans_light_italic;
}

.festival-content__content p {
  @apply mb-4;
}

.festival-content__content--festival {
  @apply border-5 border-navy;
}

.festival-content__content--bsf11 {
  @apply border-4 lg:border-md 2xl:border-lg border-black rounded-3xl xl:rounded-4xl font-medium font-sans text-2xl;
}

</style>
