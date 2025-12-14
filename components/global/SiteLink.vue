<template>
  <RawLink v-cursor-interact :to="to" :click-handler="clickHandler" :class-names="classNames">
    <slot />
  </RawLink>
</template>

<script>
export default {
  name: 'SiteLink',
  // eslint-disable-next-line vue/require-prop-types
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    },
    clickHandler: {
      type: Function,
      required: false,
      default: null
    },
    classNames: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
