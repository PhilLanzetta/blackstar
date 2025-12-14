<template>
  <GlobalLayout />
</template>

<script>
export default {
  name: 'bsf10',
  mounted () {
    this.$store.commit('mobileNav/close')
    this.$store.commit('setMegaNav', null)
    this.$store.commit('setTheme', 'festival')
    this.$store.commit('setBackgroundColor', 'white')
    this.$store.commit('cursor/leaveAlt')
    this.$store.commit('cursor/hint', false)
  },
  created () {
    this.$store.commit('mobileNav/close')
    this.$store.commit('setMegaNav', null)
    this.$store.commit('setTheme', 'festival')
    this.$store.commit('setBackgroundColor', 'white')
    this.$store.commit('cursor/leaveAlt')
    this.$store.commit('cursor/hint', false)
  }
}
</script>
