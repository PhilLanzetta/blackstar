export default {
  props: {
    colorScheme: {
      type: String,
      required: false,
      default: 'black'
    },
    forceScheme: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    textColor () {
      if (['black', 'teal'].includes(this.color)) {
        return 'white'
      }

      return 'black'
    },
    color () {
      if (this.$store.state.background === this.colorScheme && !this.forceScheme) {
        return 'white'
      }

      return this.colorScheme
    }
  }
}
