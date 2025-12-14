export default {
  props: {
    onCompleteCallback: {
      type: Function,
      required: false,
      default: null
    }
  },
  data () {
    return {
      email: null,
      busy: false,
      error: false,
      success: false
    }
  },
  methods: {
    submitNewsletter () {
      if (this.busy) {
        return
      }
      this.busy = true
      try {
        this.$axios.post(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/newsletter-subscribe`, {
          email: this.email,
          _key: 'Uo3MeZitz.KFNZu'
        }).then((response) => {
          // console.log(response.data)
          this.busy = false
          this.success = true

          if (this.onCompleteCallback) {
            this.onCompleteCallback()
          }
        }).catch((response) => {
          this.error = true
          this.busy = false
        })
      } catch (e) {
        this.busy = false
        this.error = true
      }
    }
  },
  computed: {
    settings () {
      if (this.$store.state.settings) {
        if ((this.$store.state.theme === 'bsf13' || this.$store.state.theme === 'bsf14') && this.$store.state.settings.festival && this.$store.state.settings.festival.newsletter_signup_settings) {
          return this.$store.state.settings.festival.newsletter_signup_settings
        }
      }

      return false
    }
  }
}
