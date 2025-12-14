<template>
  <div class="top-0 left-0 right-0 bottom-0 bg-offWhite bg-opacity-25 flex items-center justify-center" :class="{'fixed z-50': !absolute, 'absolute z-40': absolute}">
    <div>
      <div class="block w-20 h-20 bg-black rounded-full animate-bounce" />
      <span class="sr-only">Loading</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Festival24Loader',
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
