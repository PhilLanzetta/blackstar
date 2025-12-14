<template>
  <h2 v-html="heading"></h2>
</template>

<script>
export default {
  name: 'SeenHeadingSmall',
  props: {
    heading: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
h2 {
  @apply block py-4 mb-4 text-2xl xl:text-3xl font-seen_serif_light border-b border-black;
}
</style>
