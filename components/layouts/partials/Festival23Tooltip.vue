<template>
  <span class="relative flex" @mouseenter="showTooltip=true" @mouseleave="showTooltip=false">
    <span :id="`tooltip-${id}`" class="tooltip" :class="{'tooltip--active': showTooltip}" :aria-expanded="!showTooltip"><svg><use
      xlink:href="#icon-arrow-tooltip"
    /></svg><span class="tooltip__inside" v-html="tooltip" /></span>
    <slot />
    <span class="sr-only"><button :aria-controls="`tooltip-${id}`" @click.prevent="showTooltip=!showTooltip">Toggle Tooltip</button></span>
  </span>
</template>

<script>
export default {
  name: 'Festival23Tooltip',
  props: {
    tooltip: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showTooltip: false,
      id: 0
    }
  },
  mounted () {
    this.id = this._uid
  }
}
</script>

<style scoped>
.tooltip {
  @apply absolute z-50 left-0 bottom-full mb-3 transform ml-2.5 -translate-x-16 opacity-0 w-0 h-0 overflow-hidden transition-opacity duration-300 pointer-events-none;
}

.tooltip--active {
  @apply w-36 h-auto opacity-100 overflow-visible;
}

.tooltip__inside {
  @apply bg-white text-black px-4 py-2 text-center text-sm relative block;
}

.tooltip svg {
  @apply w-10 h-4 -mt-0.5 text-white bottom-0 left-1/2 z-0 absolute block transform -translate-x-1/2 translate-y-full;
}
</style>
