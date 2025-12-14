<template>
  <button class="close" v-cursor-interact :class="(alt ? ' close--alt ' : '') + borderClass + ` close--${this.$store.state.theme}`" @click.prevent="clickHandler">
    <CloseIcon /><span class="sr-only">Close</span>
  </button>
</template>

<script>
import CloseIcon from '~/assets/festival/close.svg?inline'

export default {
  name: 'FestivalCloseButton',
  components: { CloseIcon },
  props: {
    clickHandler: {
      type: Function,
      required: true
    },
    borderClass: {
      type: String,
      required: false,
      default: 'border-5 border-navy'
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
button {
  @apply bg-pink text-white p-4;
}

button svg {
  @apply w-10 h-10;
}

button.close--alt {
  @apply bg-white text-red p-0;
}

button.close--alt svg {
  @apply w-8 h-8;
}

button.close--bsf11 {
  @apply bg-bsf11Teal rounded-xl border-4 border-black text-black;
}

button.close--bsf11.close--alt {
  @apply bg-white;
}
</style>
