<template>
  <span @mouseenter="(alt ? $store.commit('cursor/hintAlt', hint) : $store.commit('cursor/hint', hint))" @mouseleave="$store.commit('cursor/hint', false)">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'CursorHint',
  props: {
    hint: {
      type: String,
      required: true
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    hint (to) {
      if (this.$store.state.cursor.hint) {
        this.$store.commit('cursor/hint', to)
      }
    }
  }
}
</script>

<style scoped>

</style>
