<template>
  <div class="seen-accordion-item motion-safe:transition-colors duration-300" :class="{'seen-accordion-item--expanded': expanded, 'seen-accordion-item--odd': !(index%2===1)}">
    <div class="seen-accordion-item__button">
      <div class="seen-accordion-item__button__inside">
        <span v-html="title" /> <span class="seen-accordion-item__button__toggle" />
        <button
          v-if="!expanded"
          v-cursor-interact
          class="seen-accordion-item__button__hit"
          :aria-controls="`seen-accordion-item-${id}`"
          :aria-expanded="expanded.toString()"
          @click.prevent="toggle"
        >
          <span class="sr-only">Open</span>
        </button>
        <button
          v-if="expanded"
          v-cursor-interact-alt
          class="seen-accordion-item__button__hit"
          :aria-controls="`seen-accordion-item-${id}`"
          :aria-expanded="expanded.toString()"
          @click.prevent="toggle"
        >
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
    <div :id="`seen-accordion-item-${id}`" :style="`height: ${height}px`" class="overflow-hidden motion-safe:transition-all duration-300">
      <div ref="inside" class="seen-accordion-item__inside">
        <CursorInteractInside>
          <slot />
        </CursorInteractInside>
      </div>
    </div>
  </div>
</template>

<script>
import accordion from '~/mixins/accordion'

export default {
  name: 'SeenAccordionItem',
  mixins: [accordion],
  props: {
    index: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.seen-accordion-item__button {
  @apply w-full py-4 text-left text-xl xl:text-2xl font-seen_serif_light_italic relative;
}

.seen-accordion-item__button__inside {
  @apply flex items-center justify-between;
}

.seen-accordion-item__button__hit {
  @apply absolute block top-0 left-0 w-full h-full;
}

.seen-accordion-item__button__hit button {
  @apply block w-full h-full;
}

.seen-accordion-item__button__toggle {
  @apply block flex-shrink-0 w-6 h-6 ml-2 motion-safe:transition-colors rounded-full border border-black bg-white;
}

.seen-accordion-item__button__toggle svg {
  @apply block w-full h-auto;
}

.seen-accordion-item--expanded .seen-accordion-item__button__toggle {
  @apply bg-black;
}

.seen-accordion-item__button__toggle img {
  @apply block w-full h-full;
}

.seen-accordion-item {
  @apply border-b border-black;
}

.seen-accordion-item__inside {
  @apply text-base font-seen_serif_light pb-10;
}

.seen-accordion-item__inside p, .seen-accordion-item__inside ul, .seen-accordion-item__inside ol {
  @apply mb-4;
}

</style>
