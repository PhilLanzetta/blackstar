<template>
  <button v-cursor-interact class="close" @click.prevent="clickHandler">
    <CloseIcon /><span class="sr-only">Close</span>
  </button>
</template>

<script>
import CloseIcon from '~/assets/festival/close.svg?inline'

export default {
  name: 'CloseButton',
  components: { CloseIcon },
  props: {
    clickHandler: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
button {
  @apply bg-transparent text-white p-4;
}

button svg {
  @apply w-16 h-16;
}

</style>
