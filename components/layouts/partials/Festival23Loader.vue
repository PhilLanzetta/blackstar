<template>
  <div class="top-0 left-0 right-0 bottom-0 bg-bsf12Bg bg-opacity-25 flex items-center justify-center" :class="{'fixed z-50': !absolute, 'absolute z-40': absolute}">
    <div>
      <svg class="block w-16 h-16 motion-safe:animate-spin">
        <use xlink:href="#icon-loader" />
      </svg>
      <span class="sr-only">Loading</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Festival23Loader',
  props: {
    absolute: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
