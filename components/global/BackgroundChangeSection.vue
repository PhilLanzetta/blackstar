<template>
  <section class="relative">
    <slot></slot>
    <span v-observe-visibility="{ active: true, callback: changeBackground }" class="pointer-events-none absolute top-1/2 left-0 w-full h-1 block"></span>
  </section>
</template>

<script>
export default {
  name: 'BackgroundChangeSection',
  props: {
    color: {
      type: String,
      required: true
    }
  },
  methods: {
    changeBackground (visible) {
      if (visible && this.$store.state.background !== this.color) {
        this.$store.commit('setBackgroundColor', this.color)
      }
    }
  }
}
</script>

<style scoped>

</style>
