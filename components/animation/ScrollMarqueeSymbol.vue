<template>
  <span class="block h-10 w-10 xl:w-14 xl:h-14 block fade-colours -mt-2">
    <SymbolArrowsDown v-if="type==='arrows-down'" />
    <SymbolArrowsDownLeft v-if="type==='arrows-down-left'" />
    <SymbolArrowsDownRight v-if="type==='arrows-down-right'" />
  </span>
</template>

<script>
import SymbolArrowsDown from '~/assets/symbol-arrows-down.svg?inline'
import SymbolArrowsDownLeft from '~/assets/symbol-arrows-down-left.svg?inline'
import SymbolArrowsDownRight from '~/assets/symbol-arrows-down-right.svg?inline'

export default {
  name: 'ScrollMarqueeSymbol',
  components: { SymbolArrowsDown, SymbolArrowsDownLeft, SymbolArrowsDownRight },
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
svg {
  @apply block w-full h-full;
}
</style>
