export default {
  props: {
    showTime: {
      type: Boolean,
      required: false,
      default: true
    },
    overrideTime: {
      type: String,
      required: false,
      default: null
    },
    filterByTagCallback: {
      type: Function,
      default: null,
      required: false
    }
  }
}
