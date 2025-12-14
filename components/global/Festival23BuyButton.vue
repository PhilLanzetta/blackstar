<template>
  <ClientOnly>
    <span
      v-show="canBuyTickets"
      ref="buyButton"
      aria-live="polite"
      itemprop="offers"
      itemscope
      itemtype="https://schema.org/Offer"
    >
      <Festival23Button v-if="ready&&normalButton" :click-handler="handleOpenEventive" :to="(ticketsUrl ? ticketsUrl : '#')" :inverse="alt"><span v-html="buyButtonLabel" /></Festival23Button>
      <Festival23Button v-if="!ready&&normalButton" :to="(ticketsUrl ? ticketsUrl : `https://festival.blackstarfest.org/schedule/tickets/${post.acf.eventive_id}`)" :inverse="alt"><span v-html="buyButtonLabel" /></Festival23Button>

      <div v-if="post.acf.eventive_id!=='1111111111'" class="eventive-button" :class="{'sr-only': normalButton}" :data-event="post.acf.eventive_id" />
    </span>
  </ClientOnly>
</template>

<script>
import eventiveBuy from '~/mixins/eventiveBuy'

export default {
  name: 'Festival23BuyButton',
  mixins: [eventiveBuy],
  props: {
    post: {
      type: Object,
      required: true
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      ready: false,
      readyChecker: null,
      normalButton: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.checkIfReady()

      this.readyChecker = setInterval(this.checkIfReady, 500)
    })
  },
  beforeDestroy () {
    if (this.readyChecker) {
      clearInterval(this.readyChecker)
    }
  },
  methods: {
    checkIfReady () {
      if (!this.$refs.buyButton) {
        return
      }

      if (this.$refs.buyButton.querySelector('.eventive-button button') || this.ticketsUrl) {
        this.ready = true
      }

      if (this.ready) {
        if (this.readyChecker) {
          clearInterval(this.readyChecker)
        }

        if (!this.ticketsUrl) {
          const allEventiveButtons = this.$refs.buyButton.querySelectorAll('.eventive-button button')
          if (allEventiveButtons.length > 1) {
            this.normalButton = false
          }
        }
      }
    },
    handleOpenEventive () {
      if (this.ticketsUrl) {
        this.$store.commit('festival/openExternalTicketsNotice', this.post)
        // window.open(this.ticketsUrl, '_blank')
        return
      }
      this.maybeOpenEventive()
      if (!this.ticketsUrl) {
        this.$nextTick(() => {
          this.normalButton = false
        })
      }
    }
  }
}
</script>

<style>
</style>
