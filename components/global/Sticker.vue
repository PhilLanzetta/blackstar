<template>
  <div class="relative">
    <span class="absolute top-5 right-5 transform rotate-12 z-10 flex rounded-full w-20 h-20 items-center justify-center text-sm text-center" :class="`bg-${color} text-${textColor}`">{{ label }}</span>
    <slot />
  </div>
</template>

<script>
import ColourScheme from '~/mixins/ColourScheme'

export default {
  name: 'Sticker',
  mixins: [ColourScheme],
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
