<template>
  <GlobalLayout />
</template>

<script>
export default {
  name: 'Bsf11',
  mounted () {
    this.$store.commit('mobileNav/close')
    this.$store.commit('setMegaNav', null)
    this.$store.commit('setTheme', 'bsf11')
    this.$store.commit('setBackgroundColor', 'bsf11Purple')
    this.$store.commit('cursor/leaveAlt')
    this.$store.commit('cursor/hint', false)
  },
  created () {
    this.$store.commit('mobileNav/close')
    this.$store.commit('setMegaNav', null)
    this.$store.commit('setTheme', 'bsf11')
    this.$store.commit('setBackgroundColor', 'bsf11Purple')
    this.$store.commit('cursor/leaveAlt')
    this.$store.commit('cursor/hint', false)
  }
}
</script>
