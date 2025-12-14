<template>
  <span
    v-show="canBuyTickets"
    ref="buyButton"
    aria-live="polite"
    itemprop="offers"
    itemscope
    itemtype="https://schema.org/Offer"
  >
    <template v-if="ready&&normalButton">
      <FestivalButton v-if="!actionHeading" to="#" :click-handler="handleOpenEventive" :alt="true">{{
        buyButtonLabel
      }}</FestivalButton>
      <FestivalActionHeading
        v-if="actionHeading"
        to="#"
        background-class="bg-pink -mt-border lg:-mt-0 lg:-ml-border py-4"
        width-class="w-full lg:w-56"
        :full-width="true"
        :click-handler="handleOpenEventive"
      >
        <span class="text-base md:text-lg font-festival_sans font-normal">{{ buyButtonLabel }}</span>
      </FestivalActionHeading>
    </template>
    <span v-cursor-interact class="eventive-button" :class="{'sr-only': normalButton}" :data-event="post.acf.eventive_id" />
  </span>
</template>

<script>
import eventiveBuy from '~/mixins/eventiveBuy'

export default {
  name: 'FestivalBuyButton',
  mixins: [eventiveBuy],
  props: {
    post: {
      type: Object,
      required: true
    },
    actionHeading: {
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

      this.readyChecker = setInterval(this.checkIfReady, 1000)
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

      this.ready = this.$refs.buyButton.querySelector('.eventive-button button')

      if (this.ready) {
        if (this.readyChecker) {
          clearInterval(this.readyChecker)
        }

        const allEventiveButtons = this.$refs.buyButton.querySelectorAll('.eventive-button button')
        if (allEventiveButtons.length > 1) {
          this.normalButton = false
        }
      }
    },
    handleOpenEventive () {
      this.openEventive()
      this.$nextTick(() => {
        this.normalButton = false
      })
    }
  }
}
</script>

<style>

</style>
