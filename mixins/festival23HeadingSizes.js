export default {
  props: {
    size: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  computed: {
    headingSizes () {
      if (this.size === 'xl') {
        return 'text-3xl 2xl:text-4xl 3xl:text-5xl font-normal'
      }

      if (this.size === 'lg') {
        return 'text-2xl 2xl:text-3xl 3xl:text-4xl font-normal'
      }
      if (this.size === 'md') {
        return 'text-2xl 2xl:text-2xl 3xl:text-3xl font-normal'
      }

      if (this.size === 'sm') {
        return 'text-lg 2xl:text-xl 3xl:text-2xl font-normal'
      }

      return 'text-base xl:text-lg 3xl:text-xl font-normal'
    }
  }
}
