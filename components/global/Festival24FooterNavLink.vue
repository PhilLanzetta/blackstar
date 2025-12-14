<template>
  <RawLink :to="to" class-names="hover:opacity-80"><slot /></RawLink>
</template>

<script>
export default {
  name: 'Festival24FooterNavLink',
  props: {
    to: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
