<template>
  <hr class="block border-none" :class="{'-mt-6 md:-mt-8': md, '-mt-8 md:-mt-16': lg, '-mt-72': xl, '-mt-4': sm}">
</template>

<script>
export default {
  name: 'NegativeSpace',
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
    },
    xl: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
