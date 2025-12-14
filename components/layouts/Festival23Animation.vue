<template>
  <ClientOnly>
    <div class="festival-23-animation-wrapper">
      <div ref="animation" class="festival-23-animation"/>
      <span class="sr-only">BlackStar Film Festival 2023 - 2nd to 6th August</span>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival23Animation',
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
        path: '/images/festival-23-standard.json'
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

<style>
.festival-23-animation,
.festival-23-animation-wrapper {
  @apply w-full h-full;
}
</style>
