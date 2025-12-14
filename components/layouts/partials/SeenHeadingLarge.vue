<template>
  <h2 v-html="heading"></h2>
</template>

<script>
export default {
  name: 'SeenHeadingLarge',
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
  @apply block py-4 mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-seen_serif_light_italic border-b border-black;
}
</style>
