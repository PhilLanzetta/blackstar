<template>
  <span :class="`text-${color}`">
    <slot />
  </span>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'TextColourChange',
  mixins: [ColourScheme]
}
</script>

<style scoped>

</style>
