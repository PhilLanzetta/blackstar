<template>
  <div class="lg:-mt-16 xl:-mt-24 2xl:-mt-32 relative">
    <div class="aspect-w-16 aspect-h-9">
      <ClientOnly>
        <div ref="animation" />
      </ClientOnly>
    </div>
    <Transition name="fade-in-down">
      <div v-if="loading" class="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center">
        <ShapeAsterix2 class="w-24 h-24 animate-spin" />
      </div>
    </Transition>
  </div>
</template>

<script>
import layout from '~/mixins/layout'
import ShapeAsterix2 from '~/assets/festival/11/shape-asterix-2.svg?inline'

export default {
  name: 'FestivalAnimation',
  components: { ShapeAsterix2 },
  mixins: [layout],
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
        loop: true,
        autoplay: true,
        path: '/images/festival22animation.json'
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
