<template>
  <section :class="`relative ${gradientStyle} text-${textColour}` + (extraPadding ? ' pb-12 2xl:pb-16' : '') + (paddingBottom&&!extraPadding ? ' pb-6 lg:pb-12 ' : '') + (roundedTop ? ' lg:rounded-t-3xl ' : '')" class="pt-12 2xl:pt-16">
    <Container v-if="section.style==='boxed'">
      <Festival24Box :background="(section.inner_background ? section.inner_background : null)" :gradient-style="(section.inner_gradient_style ? section.inner_gradient_style : null)">
        <slot />
      </Festival24Box>
    </Container>
    <Container v-else-if="section.style==='contained'">
      <slot />
    </Container>
    <template v-else-if="section.style==='indented'">
      <Container>
        <div class="px-6 lg:px-8">
          <slot />
        </div>
      </Container>
    </template>
    <template v-else-if="section.style==='reduced_container'">
      <Container>
        <div class="max-w-3xl mx-auto">
          <slot />
        </div>
      </Container>
    </template>
    <template v-else>
      <slot />
    </template>
    <div v-if="cardsLayout" class="hidden md:flex absolute top-0 left-0 w-full h-full z-0">
      <div v-for="(card, cardKey) in cardsLayout.cards" :key="`bg-column${cardKey}`" class="w-full h-full" :class="cardsLayoutStyles(card)" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Festival24Section',
  props: {
    section: {
      type: Object,
      required: true
    },
    extraPadding: {
      type: Boolean,
      required: false,
      default: false
    },
    paddingBottom: {
      type: Boolean,
      required: false,
      default: true
    },
    roundedTop: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    cardsLayoutStyles (card) {
      const classes = []
      if (card.gradient_style && card.gradient_style !== 'none') {
        if (card.gradient_style === 'top') {
          classes.push(`bg-gradient-to-b from-${card.background.replace('Tint', '')}Tint to-${card.background.replace('Tint', '')}`)
        } else {
          classes.push(`bg-gradient-to-t from-${card.background.replace('Tint', '')}Tint to-${card.background.replace('Tint', '')}`)
        }
      } else {
        classes.push(`bg-${card.background}`)
      }

      return classes
    }
  },
  computed: {
    background () {
      if (this.section.background) {
        return this.section.background
      }

      if (this.$store.state.theme === 'bsf14') {
        return 'offWhite'
      }

      return 'beige'
    },
    textColour () {
      if (this.background === 'black') {
        return 'white'
      }

      return 'black'
    },
    gradientStyle () {
      if (this.section.gradient_style && this.section.gradient_style !== 'none') {
        if (this.section.gradient_style === 'top') {
          return `bg-gradient-to-b from-${this.background.replace('Tint', '')}Tint to-${this.background.replace('Tint', '')}`
        }

        return `bg-gradient-to-t from-${this.background.replace('Tint', '')}Tint to-${this.background.replace('Tint', '')}`
      }

      return `bg-${this.background}`
    },
    cardsLayout () {
      const matches = this.section.layouts.filter(function (layout) {
        return layout.acf_fc_layout === 'cards'
      })
      if (matches.length) {
        return matches[0]
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
