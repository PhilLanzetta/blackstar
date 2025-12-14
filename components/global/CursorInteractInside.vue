<template>
  <div ref="content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CursorInteractInside',
  data () {
    return {
      linkList: null,
      posterVideos: null
    }
  },
  mounted () {
    this.linkList = this.$refs.content.getElementsByTagName('a')

    for (const link of this.linkList) {
      link.onmouseenter = this.handleMouseEnter
      link.onmouseleave = this.handleMouseLeave
    }

    this.posterVideos = this.$refs.content.getElementsByClassName('poster-video__inside')
    for (const posterVideo of this.posterVideos) {
      posterVideo.onmouseenter = this.handlePosterVideoEnter
      posterVideo.onmouseleave = this.handlePosterVideoLeave
      posterVideo.onclick = this.handlePosterVideoClick
    }

    this.iframeVideos = this.$refs.content.getElementsByClassName('iframe-wrapper__inside')
    for (const iframeVideo of this.iframeVideos) {
      iframeVideo.onmouseenter = this.handleiFrameVideoEnter
      iframeVideo.onmouseleave = this.handleiFrameVideoLeave
      iframeVideo.onclick = this.handleiFrameVideoClick
    }
  },
  methods: {
    handleMouseEnter () {
      this.$store.commit('cursor/enter')
    },
    handleMouseLeave () {
      this.$store.commit('cursor/leave')
    },
    handlePosterVideoEnter (e) {
      if (!e.target.parentElement.classList.contains('playing')) {
        this.$store.commit('cursor/hint', 'Watch')
      }
    },
    handlePosterVideoLeave () {
      this.$store.commit('cursor/hint', null)
    },
    handlePosterVideoClick (e) {
      e.target.parentElement.classList.add('playing')
      e.target.parentElement.querySelector('video').play()
      this.$store.commit('cursor/hint', null)
    },
    handleiFrameVideoEnter (e) {
      if (!e.target.parentElement.classList.contains('playing')) {
        this.$store.commit('cursor/hint', 'Watch')
      }
    },
    handleiFrameVideoLeave () {
      this.$store.commit('cursor/hint', null)
      this.$store.commit('cursor/show')
    },
    handleiFrameVideoClick (e) {
      e.target.parentElement.classList.add('playing')
      const iframe = e.target.querySelector('iframe')
      iframe.setAttribute('src', iframe.src + '&autoplay=1')
      this.$store.commit('cursor/hint', null)
      this.$store.commit('cursor/hide')
    }
  }
}
</script>

<style scoped>

</style>
