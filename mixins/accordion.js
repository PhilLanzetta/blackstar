export default {
  data () {
    return {
      height: 0,
      expanded: false
    }
  },
  watch: {
    expanded (to) {
      if (to) {
        this.height = this.$refs.inside.offsetHeight
      } else {
        this.height = 0
      }
    }
  },
  methods: {
    toggle () {
      this.expanded = !this.expanded
    },
    correctHeight () {
      if (!this.expanded) {
        this.height = 0
        return
      }

      if (!this.$refs.inside) {
        return
      }

      this.height = this.$refs.inside.offsetHeight
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.correctHeight()
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.correctHeight)
      }
    })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.correctHeight)
    }
  }
}
