<template>
  <div>
    <ClientOnly>
      <div ref="animation" />
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'FestivalTwentyThreeAnimation',
  data () {
    return {
      loading: true,
      animation: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.animation = this.$lottie.loadAnimation({
        container: this.$refs.animation,
        loop: false,
        autoplay: true,
        path: '/images/festival-23-lottie.json'
      })

      this.animation.addEventListener('DOMLoaded', this.onLoaded)
    })
  },
  beforeDestroy () {
    if (this.animation) {
      this.animation.removeEventListener('DOMLoaded', this.onLoaded)
    }
  },
  methods: {
    onLoaded () {
      this.loading = false
    }
  }
}
</script>
