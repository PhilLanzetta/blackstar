<template>
  <span class="relative flex" @mouseenter="showTooltip=true" @mouseleave="showTooltip=false">
    <span :id="`tooltip-${id}`" class="tooltip" :class="{'tooltip--active': showTooltip, 'tooltip--2025': $store.state.theme==='bsf14'}" :aria-expanded="!showTooltip"><svg><use
      xlink:href="#icon-arrow-tooltip"
    /></svg><span class="tooltip__inside" :class="($store.state.theme === 'bsf14'&&bg==='beige' ? 'bg-black !text-white' : `bg-${bg}`)" v-html="tooltip" /></span>
    <slot />
    <span class="sr-only"><button :aria-controls="`tooltip-${id}`" @click.prevent="showTooltip=!showTooltip">Toggle Tooltip</button></span>
  </span>
</template>

<script>
export default {
  name: 'Festival24Tooltip',
  props: {
    tooltip: {
      type: String,
      required: true
    },
    bg: {
      type: String,
      required: false,
      default: 'beige'
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
  @apply absolute z-50 left-1/2 bottom-full mb-3 transform -translate-x-1/2 opacity-0 w-0 h-0 overflow-hidden transition-opacity duration-300 pointer-events-none;
}

.tooltip--active {
  @apply w-auto h-auto opacity-100 overflow-visible;
}

.tooltip__inside {
  @apply text-black border border-black rounded-xl px-2 py-2 text-center text-sm relative block;
}

.tooltip__inside::after {
  @apply block w-2 h-2 bg-black absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[1px] rotate-45 bg-inherit border-b border-r border-black;

  content: " ";
}

.tooltip--2025 .tooltip__inside {
  @apply !border-0;

}
.tooltip--2025 .tooltip__inside::after {
  @apply border-none bg-none;
}

.tooltip svg {
  @apply w-10 h-4 -mt-0.5 text-white bottom-0 left-1/2 z-0 absolute block transform -translate-x-1/2 translate-y-full;
}
</style>
