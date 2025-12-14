<template>
  <button v-cursor-interact class="btn-load" @click.prevent="clickHandler"><span>Load More</span></button>
</template>

<script>
export default {
  name: 'SeenLoadMore',
  props: {
    clickHandler: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>

.btn-load {
  @apply mx-auto border-0 rounded-full w-32 h-32 p-2 text-white bg-black flex items-center justify-center font-seen_serif_italic;
}

</style>
