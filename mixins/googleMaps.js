export default {
  data () {
    return {
      checker: null
    }
  },
  computed: {
    markers () {
      if (this.layout.map_markers) {
        return this.layout.map_markers
      }

      return []
    }
  },
  mounted () {
    this.checker = setInterval(() => {
      if (this.$refs.gMap && this.$refs.gMap.google) {
        this.$forceUpdate()
        clearInterval(this.checker)
        this.checker = null
      }
    }, 100)
  },
  beforeDestroy () {
    if (this.checker) {
      clearInterval(this.checker)
    }
  }
}
