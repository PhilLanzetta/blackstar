<template>
  <hr class="block border-none" :class="spacingClasses">
</template>

<script>
export default {
  name: 'Space',
  props: {
    sm: {
      type: Boolean,
      required: false,
      default: false
    },
    md: {
      type: Boolean,
      required: false,
      default: false
    },
    lg: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    spacingClasses () {
      if (this.lg) {
        if (this.$store.state.theme === 'bsf11') {
          return 'py-4 md:py-8'
        }

        return 'py-8 md:py-16'
      }

      if (this.md) {
        if (this.$store.state.theme === 'bsf11') {
          return 'py-2 md:py-4'
        }

        return 'py-6 md:py-8'
      }

      return 'py-2'
    }
  }
}
</script>

<style scoped>

</style>
