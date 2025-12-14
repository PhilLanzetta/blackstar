<template>
  <div class="absolute select-none pointer-events-none parallax-shape">
    <ClientOnly>
      <div ref="shape" class="shape">
        <slot />
      </div>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'RellaxShape',
  props: {
    wrapper: {
      type: String,
      required: false,
      default: null
    },
    speed: {
      type: Number,
      required: false,
      default: -2
    }
  },
  data () {
    return {
      rellax: null
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.$nextTick(() => {
        this.rellax = new this.$rellax(this.$refs.shape, {
          speed: this.speed,
          center: false,
          wrapper: this.wrapper,
          round: true,
          vertical: true,
          horizontal: false
        })
      })
    }
  }
}
</script>

<style scoped>
.shape svg {
  @apply w-full h-auto block;
}
</style>
