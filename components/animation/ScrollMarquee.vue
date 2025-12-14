<template>
  <div class="marquee flex overflow-hidden select-none py-5 lg:py-10" :class="`text-${color}`">
    <span v-for="item in items" :key="item" class="transform-gpu"><span class="flex space-x-4 items-center leading-0"><span class="font-serif_iranic text-2xl xl:text-4xl inline-block -mt-2">{{ word1 }}</span> <span class="h-6 w-6 xl:w-8 xl:h-8 rounded-full block fade-colours -mt-1.5 " :class="`bg-${color}`" /> <CircleSvg class="h-6 w-6 xl:w-8 xl:h-8 block fade-colours -mt-1.5" /> <ScrollMarqueeSymbol :type="symbol" /> <span class="text-2xl xl:text-4xl font-medium inline-block -mt-1">{{ word2 }}</span> <ScrollMarqueeSymbol :type="symbol" /></span></span>
  </div>
</template>

<script>
import CircleSvg from '~/assets/circle.svg?inline'

export default {
  name: 'ScrollMarquee',
  components: { CircleSvg },
  props: {
    word1: {
      type: String,
      required: true
    },
    word2: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    forceColour: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    color () {
      if (this.forceColour) {
        return this.forceColour
      }

      if (this.$store.state.background === 'black') {
        return 'white'
      }

      return 'black'
    }
  }
}
</script>

<style scoped>
.marquee > span {
  @apply motion-safe:animate-marquee flex-shrink-0 flex-grow-0 pr-4;
}
</style>
