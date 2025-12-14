<template>
  <div class="flex flex-wrap">
    <Festival23Button class="mr-2 my-1" v-for="(button, key) in buttons" :key="`button${key}`" :to="button.button.url|replaceSiteUrl"><span v-html="button.button.title"></span></Festival23Button>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Festival23Buttons',
  props: {
    buttons: {
      type: Array,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
