<template>
  <ClientOnly>
    <div ref="box" class="festival-23-box-mask" :style="`clip-path: ${polygon}`">
      <slot />
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Festival23BoxMask',
  props: {
    topOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      polygon: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
    }
  },
  mounted () {
    window.addEventListener('resize', this.setPolygon, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setPolygon)
  },
  updated () {
    this.setPolygon()
  },
  methods: {
    setPolygon () {
      if (!this.$refs.box) {
        return
      }

      const boxWidth = this.$refs.box.offsetWidth
      const boxHeight = this.$refs.box.offsetHeight
      let bevelSize = 6

      if (this.small) {
        bevelSize = 3
      }

      const relativeWidthDifference = 100 * ((boxWidth - bevelSize) / ((boxWidth + bevelSize) / 2))
      const relativeHeightDifference = 100 * ((boxHeight - bevelSize) / ((boxHeight + bevelSize) / 2))

      const wl = 100 - (relativeWidthDifference - 100)
      const wr = (relativeWidthDifference - 100)
      const hl = 100 - (relativeHeightDifference - 100)
      const hr = (relativeHeightDifference - 100)

      if (this.topOnly) {
        this.polygon = `polygon(${wl}% 0%, ${wr}% 0%, 100% ${hl}%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% ${hl}%)`
        return
      }

      this.polygon = `polygon(${wl}% 0%, ${wr}% 0%, 100% ${hl}%, 100% ${hr}%, ${wr}% 100%, ${wl}% 100%, 0% ${hr}%, 0% ${hl}%)`
    }
  }
}
</script>

<style>
.festival-23-box-mask {
  @apply relative w-full h-full;
}

</style>
