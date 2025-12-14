import moment from 'moment-timezone'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    watchLive () {
      if (!this.post.acf.live_stream) {
        return false
      }

      if (!this.post.acf.facebook_livestream_url) {
        return false
      }

      if (this.post.acf.start_time) {
        const checkTime = moment().tz('America/New_York').add(1, 'hour')
        if (checkTime.isSameOrAfter(moment.tz(this.post.acf.start_time, 'America/New_York'))) {
          return true
        }
      }

      return false
    },
    watchLiveLabel () {
      if (this.post.acf.livestream_url_label) {
        return this.post.acf.livestream_url_label
      }

      return 'Watch Live'
    }
  }
}
