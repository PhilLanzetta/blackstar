export default {
  computed: {
    _redirect () {
      if (this.deployedObject && this.deployedObject._redirect) {
        return this.deployedObject
      }

      return false
    }
  },
  mounted () {
    if (this._redirect) {
      this.$nextTick(() => {
        // this.$router.push(this._redirect.target)
      })
    }
  }
}
