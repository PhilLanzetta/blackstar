<template>
  <div class="accordion-item motion-safe:transition-colors duration-300" :class="dynamicStyles">
    <div class="accordion-item__button">
      <Container>
        <div class="accordion-item__button__inside">
          <span v-html="title" /> <span class="accordion-item__button__toggle">    <SymbolArrowsDown />
          </span>
          <button
            v-if="!expanded"
            v-cursor-interact
            class="accordion-item__button__hit"
            :aria-controls="`accordion-item-${id}`"
            :aria-expanded="expanded.toString()"
            @click.prevent="toggle"
          >
            <span class="sr-only">Open</span>
          </button>
          <button
            v-if="expanded"
            v-cursor-interact-alt
            class="accordion-item__button__hit"
            :aria-controls="`accordion-item-${id}`"
            :aria-expanded="expanded.toString()"
            @click.prevent="toggle"
          >
            <span class="sr-only">Close</span>
          </button>
        </div>
      </Container>
    </div>
    <div :id="`accordion-item-${id}`" :style="`height: ${height}px`" class="overflow-hidden motion-safe:transition-all duration-300">
      <div ref="inside" class="accordion-item__inside">
        <Container>
          <CursorInteractInside>
            <slot />
          </CursorInteractInside>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import SymbolArrowsDown from '~/assets/symbol-arrows-down.svg?inline'
import accordion from '~/mixins/accordion'

export default {
  name: 'AccordionItem',
  components: { SymbolArrowsDown },
  mixins: [accordion],
  props: {
    index: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    colour: {
      type: String,
      required: false,
      default: 'brightYellow'
    }
  },
  computed: {
    dynamicStyles () {
      const classes = []

      if (this.expanded) {
        classes.push('accordion-item--expanded')
        classes.push(`bg-${this.colour}`)
      } else if (!(this.index % 2 === 1)) {
        classes.push('bg-offWhite')
      } else {
        classes.push('bg-white')
      }

      return classes
    }
  }
}
</script>

<style>
.accordion-item__button {
  @apply w-full lg:px-5 py-3 xl:px-10 xl:py-5 text-left text-sm lg:text-2xl font-medium relative;
}

.accordion-item__button__inside {
  @apply flex items-center justify-between;
}

.accordion-item__button__hit {
  @apply absolute block top-0 left-0 w-full h-full;
}

.accordion-item__button__hit button {
  @apply block w-full h-full;
}

.accordion-item__button__toggle {
  @apply block flex-shrink-0 w-6 h-auto xl:w-10 ml-4 motion-safe:transition-transform;
}

.accordion-item__button__toggle svg {
  @apply block w-full h-auto;
}

.accordion-item--expanded .accordion-item__button__toggle {
  @apply transform -rotate-180;
}

.accordion-item__button__toggle img {
  @apply block w-full h-full;
}

.accordion-item {
  @apply border-b-2 border-t-2 border-transparent;
}

.accordion-item--expanded {
  @apply border-black;
}

.accordion-item__button em {
  @apply font-serif_italic_alt;
}

.accordion-item__inside {
  @apply py-5 xl:px-10 xl:pt-5 xl:pb-10 text-sm md:text-lg lg:text-2xl font-medium;
}

.accordion-item__inside em, .accordion-item__inside a {
  @apply font-serif_italic;
}

.accordion-item__inside p, .accordion-item__inside ul, .accordion-item__inside ol {
  @apply mb-4;
}

</style>
