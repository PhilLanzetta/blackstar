export default {
  data () {
    return {
      items: []
    }
  },
  watch: {
    '$store.state.liveData' () {
      this.items = []
      this.$nextTick(() => {
        this.$fetch()
      })
    }
  }
}
