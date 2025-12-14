<template>
  <div class="expandable motion-safe:transition-colors duration-300" :class="{'expandable--expanded': expanded, 'expandable--festival': $store.state.theme==='festival', 'expandable--bsf11': $store.state.theme==='bsf11'}">
    <div class="expandable__button">
      <span v-html="title" /> <span class="expandable__button__toggle"><img v-if="$store.state.theme==='festival'" src="~/assets/festival/toggle.svg" alt="" width="67" height="67"></span>
      <button v-cursor-interact class="expandable__button__hit" :aria-controls="`expandable-${id}`" :aria-expanded="expanded.toString()" @click.prevent="toggle">
        <span v-show="!expanded" class="sr-only">Open</span><span v-show="expanded" class="sr-only">Close</span>
      </button>
    </div>
    <div :id="`expandable-${id}`" :style="`height: ${height}px`" class="overflow-hidden motion-safe:transition-all duration-300">
      <div ref="inside" class="expandable__inside">
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
  name: 'FestivalExpandableContent',
  mixins: [accordion],
  props: {
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
.expandable__button {
  @apply relative border-navy flex items-center justify-between w-full px-5 py-3 xl:px-10 xl:py-5 text-left text-sm lg:text-xl;
}

.expandable--festival .expandable__button {
  @apply border-t-5;
}

.expandable__button__hit {
  @apply absolute block top-0 left-0 w-full h-full;
}

.expandable__button__hit button {
  @apply block w-full h-full;
}

.expandable__button__toggle {
  @apply block flex-shrink-0 w-6 h-6 xl:w-11 xl:h-11 ml-2 motion-safe:transition-transform;
}

.expandable--bsf11 .expandable__button__toggle {
  @apply relative;
}

.expandable--bsf11 .expandable__button__toggle::before,
.expandable--bsf11 .expandable__button__toggle::after {
  @apply block absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-black transition-transform duration-100;

  content: " ";
}

.expandable--bsf11 .expandable__button__toggle::before {
  @apply rotate-90;
}

.expandable--festival.expandable--expanded .expandable__button__toggle {
  @apply transform -rotate-45;
}

.expandable--bsf11.expandable--expanded .expandable__button__toggle::before {
  @apply rotate-180;
}

.expandable__button__toggle img {
  @apply block w-full h-full;
}

.expandable {
  @apply bg-white relative;
}

.expandable.expandable--bsf11 {
  @apply rounded-3xl xl:rounded-4xl border-4 lg:border-md 2xl:border-lg border-black bg-bsf11Yellow pb-24 -mb-24;
}

.expandable.expandable--bsf11:nth-child(2n+2) {
  @apply bg-bsf11Yellow;
}

.expandable.expandable--bsf11:nth-child(3n+3) {
  @apply bg-white;
}

.expandable.expandable--bsf11:nth-child(4n+4),
.expandable.expandable--bsf11:first-child,
.expandable.expandable--bsf11:nth-child(10n+10),
.expandable.expandable--bsf11:nth-child(14n+14) {
  @apply bg-bsf11Teal;
}

.expandable.expandable--bsf11:last-child {
  @apply pb-4 mb-0;
}

.expandable--festival.expandable--expanded {
  @apply bg-yellow;
}

.expandable--bsf11.expandable--expanded {
  @apply z-10;
}

.expandable--bsf11.expandable--expanded .expandable__inside {
  @apply pb-20;
}

.expandable--bsf11.expandable--expanded + .expandable:not(.expandable--expanded) {
  @apply pt-20;
}

.expandable--festival .expandable__button em {
  @apply font-festival_sans_light_italic;
}

.expandable--bsf11 .expandable__button {
  @apply md:font-bsf11_sans text-xl lg:text-4xl 2xl:text-5xl pt-8 pb-4;
}

.expandable__inside {
  @apply p-5 xl:px-10 xl:pt-5 xl:pb-10 text-sm lg:text-lg;
}

.expandable--bsf11 .expandable__inside {
  @apply text-base lg:text-xl xl:text-2xl;
}

.expandable--festival .expandable__inside {
  @apply font-festival_sans font-light;
}

.expandable--festival .expandable__inside em,
.expandable--festival .expandable__inside a {
  @apply font-festival_sans_light_italic;
}

</style>
