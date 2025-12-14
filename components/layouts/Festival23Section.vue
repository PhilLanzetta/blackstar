<template>
  <section :class="`bg-${background} text-${textColour}`" class="py-6 md:py-10 lg:py-12 xl:py-16 2xl:py-20">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'Festival23Section',
  props: {
    background: {
      type: String,
      required: false,
      default: 'bsf12Bg'
    }
  },
  computed: {
    textColour () {
      if (this.background === 'black') {
        return 'white'
      }

      return 'black'
    }
  }
}
</script>

<style scoped>

</style>
