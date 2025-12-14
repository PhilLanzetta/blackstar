<template>
  <GlobalLayout />
</template>

<script>
export default {
  name: 'default',
  mounted () {
    this.$store.commit('mobileNav/close')
    this.$store.commit('setMegaNav', null)
    this.$store.commit('setTheme', 'default')
    this.$store.commit('setBackgroundColor', 'white')
    this.$store.commit('cursor/leaveAlt')
    this.$store.commit('cursor/hint', false)
  }
}
</script>
