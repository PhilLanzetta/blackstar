export default {
  mounted () {
    document.addEventListener('keyup', this.closeOnEscape)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.closeOnEscape)
  },
  methods: {
    closeOnEscape (e) {
      if (e.key === 'Escape') {
        this.closeModal()
      }
    }
  }
}
