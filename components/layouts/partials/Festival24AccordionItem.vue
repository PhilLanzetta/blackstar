<template>
  <div class="my-2" :class="dynamicStyles">
    <div class="rounded-3xl" :class="($store.state.theme === 'bsf13' ? ' border border-solid border-black ' : (background ? ` bg-${background} ` : '' ))">
      <div class="relative p-6 lg:p-8">
        <div class="flex space-x-4 justify-between items-center">
          <h2 class="font-medium text-lg lg:text-xl">
            <span v-html="title" />
          </h2>
          <div class="transform transition-transform duration-300" :class="{'rotate-180': expanded, '': !expanded}">
            <svg
              width="19"
              height="11"
              class="block w-4 h-2.5 lg:w-6 lg:h-4"
              viewBox="0 0 19 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.99393 0L9.49545 7.07338L15.0297 0L18.49 0L10.5543 10.097H8.46937L0.48999 0L3.98302 0L3.99393 0Z" fill="black" />
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
        <div ref="inside" class="p-6 lg:p-8 pt-0 lg:pt-0 text-lg lg:text-xl">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import accordion from '~/mixins/accordion'

export default {
  name: 'Festival24AccordionItem',
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
    background: {
      type: String,
      required: false,
      default: null
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
  @apply absolute block top-0 left-0 w-full h-full;
}
</style>
