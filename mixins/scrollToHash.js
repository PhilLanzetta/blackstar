export default {
  watch: {
    '$nuxt.$route' () {
      this.$nextTick(() => {
        this.scrollToHash()
      })
    }
  },
  mounted () {
    this.scrollToHash()
  },
  methods: {
    scrollToHash () {
      if (typeof window === 'undefined') {
        return
      }

      if (this.$route.hash) {
        setTimeout(() => {
          const anchoredSection = document.getElementById(this.$route.hash.replace('#', ''))
          if (anchoredSection) {
            try {
              const yOffset = document.getElementById('site-header').offsetHeight
              const y = (anchoredSection.getBoundingClientRect().top + window.pageYOffset) - yOffset
              window.scrollTo({ top: y, behavior: 'smooth' })
            } catch (e) {
              //
            }
          }
        }, 1000)
      } else {
        window.scrollTo({ top: 0 })
      }
    }
  }
}
