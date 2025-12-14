<template>
  <div v-if="cover" class="select-none sticky top-0" :class="{'scroll-snap-start': $store.state.scrollSnap}">
    <div class="w-full min-height-half lg:h-screen lg:absolute top-0 left-0 z-0">
      <CoverText v-if="cover.acf_fc_layout==='cover_text'" :layout="cover" />
      <SpotlightHero v-if="cover.acf_fc_layout==='cover_spotlight_hero'" :layout="cover" />
    </div>
    <div v-observe-visibility="{ active: true, callback: setCoverVisible }" class="hidden lg:block w-full min-height-half lg:h-screen relative pointer-events-none" :style="`margin-top: -${$store.state.cover.headerOffset}px;`">
      <div v-observe-visibility="{ active: true, callback: removeScrollSnap }" class="absolute -bottom-full left-0 h-1 w-full" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cover',
  data () {
    return {
      cover: null
    }
  },
  async fetch () {
    try {
      const cover = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/cover`)

      if (cover && cover.length) {
        this.cover = cover[0]
      }
    } catch (e) {
      this.cover = null
    }
  },
  mounted () {
    this.$store.commit('cover/isVisible')

    if (this.$route.query.snap) {
      document.querySelector('html, body').classList.add('scroll-snap')
      this.$store.commit('enableScrollSnap')
    }
  },
  beforeDestroy () {
    this.$store.commit('cover/isSeen')
    document.querySelector('html, body').classList.remove('scroll-snap')
    this.$store.commit('disableScrollSnap')
  },
  methods: {
    removeScrollSnap (visible) {
      if (visible) {
        this.$store.commit('cover/isNotVisible')

        if (this.$store.state.scrollSnap) {
          document.querySelector('html, body').classList.remove('scroll-snap')
          this.$store.commit('disableScrollSnap')
          this.$nextTick(() => {
            window.dispatchEvent(new Event('resize'))
          })
        }
      }
    },
    setCoverVisible (visible) {
      if (visible) {
        this.$store.commit('cover/isVisible')
      }
    }
  }
}
</script>

<style scoped>
.min-height-half {
  min-height: 50vh;
}
</style>
