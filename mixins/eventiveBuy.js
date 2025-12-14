import moment from 'moment-timezone'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      forceComingSoon: false
    }
  },
  computed: {
    canBuyTickets () {
      if (this.post.acf.hide_tickets_button) {
        return false
      }

      if (this.post.acf.coming_soon && !this.post.acf.allow_preorder) {
        return false
      }

      // if (!this.post.acf.availability) {
      //   return false
      // }

      if (!this.post.acf.eventive_id) {
        return false
      }

      // if (!this.post.acf.tickets_available) {
      //   return false
      // }

      const checkTime = moment().tz('America/New_York')
      if (checkTime.isSameOrAfter(moment.tz(this.post.acf.end_time, 'America/New_York'))) {
        return false
      }

      if (this.post.acf.live_stream) {
        if (this.post.acf.facebook_livestream_url && this.post.acf.livestream_hide_eventive_button) {
          const checkTime2 = moment().tz('America/New_York').add(1, 'hour')
          if (checkTime2.isSameOrAfter(moment.tz(this.post.acf.start_time, 'America/New_York'))) {
            return false
          }
        }
      }

      return true
    },
    buyButtonLabel () {
      if (this.post.acf.virtual_event || this.post.acf.is_virtual) {
        if (this.post.acf.start_time) {
          const checkTime = moment().tz('America/New_York').add(1, 'hour')
          if (checkTime.isSameOrAfter(moment.tz(this.post.acf.start_time, 'America/New_York'))) {
            return 'Watch Now'
          }
        }
      }

      if (this.post.acf.buy_call_to_action) {
        return this.post.acf.buy_call_to_action
      }

      if (this.forceComingSoon) {
        return 'Coming Soon'
      }

      if (this.post.acf.is_event) {
        return 'RSVP'
      }

      if (!this.post.acf.availability || !this.post.acf.tickets_available) {
        return 'Sold out (info)'
      }

      return 'Buy Tickets'
    },
    ticketsUrl () {
      return (this.post.acf.external_tickets_url ? this.post.acf.external_tickets_url : false)
    }
  },
  methods: {
    openEventive () {
      let eventiveBuyButton = this.$refs.buyButton.querySelector('.eventive-button button')
      if (eventiveBuyButton) {
        if (eventiveBuyButton.disabled) {
          this.forceComingSoon = true
          return
        }

        this.forceComingSoon = false

        eventiveBuyButton.click()
      } else {
        try {
          window.Eventive.rebuild()
          setTimeout(() => {
            eventiveBuyButton = this.$refs.buyButton.querySelector('.eventive-button button')
            if (eventiveBuyButton) {
              if (eventiveBuyButton.disabled) {
                this.forceComingSoon = true
                return
              }

              this.forceComingSoon = false

              eventiveBuyButton.click()
            }
          }, 0)
        } catch (e) {
          // console.log(e)
        }
      }
    },
    maybeOpenEventive () {
      if (this.ticketsUrl) {
        window.location = this.ticketsUrl
        return
      }

      this.openEventive()
    }
  }
}
