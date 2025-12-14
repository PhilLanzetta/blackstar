<template>
  <div class=" motion-safe:transition-colors duration-300" :class="dynamicStyles">
    <Container>
      <div class="border-b-2 border-black">
        <div class="relative py-4 lg:py-6">
          <div class="flex space-x-4 justify-between items-center">
            <Festival23H3 size="sm">
              <span v-html="title" />
            </Festival23H3>
            <div class="transform transition-transform duration-300" :class="{'rotate-90': expanded, '-rotate-90': !expanded}">
              <svg v-if="expanded">
                <use xlink:href="#icon-arrow-solid" />
              </svg>
              <svg v-if="!expanded">
                <use xlink:href="#icon-arrow-outline" />
              </svg>
            </div>
          </div>
          <button
            :aria-controls="`accordion-item-${id}`"
            :aria-expanded="expanded.toString()"
            @click.prevent="toggle"
          >
            <span class="sr-only">{{ label }}</span>
          </button>
        </div>
        <div :id="`accordion-item-${id}`" :style="`height: ${height}px`" class="overflow-hidden motion-safe:transition-all duration-300">
          <div ref="inside" class="py-4 lg:py-6">
            <Festival23Prose>
              <slot />
            </Festival23Prose>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import accordion from '~/mixins/accordion'

export default {
  name: 'Festival23AccordionItem',
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
    }
  },
  computed: {
    label () {
      if (this.expanded) {
        return 'Close'
      }

      return 'Open'
    },
    dynamicStyles () {
      const classes = []

      if (this.expanded) {
        classes.push('accordion-item--expanded')
      }

      return classes
    }
  }
}
</script>

<style scoped>
button {
  @apply block top-0 left-0 w-full h-full absolute z-10;
}

svg {
  @apply w-7 h-7 flex-shrink-0 block;
}
</style>
