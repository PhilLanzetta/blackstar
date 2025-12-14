<template>
  <ClientOnly>
    <div class="mb-8 text-lg">
      <time class="font-medium" itemprop="startDate" :content="eventInstance.acf.start_time|formatMicroDate">
        {{ eventInstance.acf.start_time|formatDate }} {{ eventInstance.acf.timezone_abv }}
      </time>
      <p
        v-if="!eventInstance.acf.is_virtual&&eventInstance.venue"
        itemprop="location"
        itemscope
        itemtype="https://schema.org/Place"
      >
        <span v-html="eventInstance.venue.name" />
      </p>
      <p v-if="eventInstance.acf.is_virtual" v-html="streamingDuration" />
      <div class="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
        <Festival24BuyButton :post="eventInstance" :alt="alt" :modifier="modifier" />
        <Festival24WatchLiveButton :post="eventInstance" :alt="alt" :modifier="modifier" />
        <Festival24SaveButton :event="eventInstance" :large="true" :alt="alt" :modifier="modifier" />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival24EventInstance',
  mixins: [eventiveEverywhere],
  props: {
    eventInstance: {
      type: Object,
      required: true
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    },
    modifier: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  computed: {
    streamingDuration () {
      if (this.eventInstance.acf.is_virtual && this.eventInstance.acf.virtual_streaming_duration) {
        return this.eventInstance.acf.virtual_streaming_duration
      }

      if (this.$store.state.settings && this.$store.state.settings.festival && this.$store.state.settings.festival.default_virtual_streaming_duration) {
        return this.$store.state.settings.festival.default_virtual_streaming_duration
      }

      return ''
    }
  }
}
</script>

<style>
.bsf14-wrap .eventive__ticket-button__button,
.bsf14-wrap .eventive__ticket-button__container {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 9999px !important;
}

.bsf14-wrap .eventive__ticket-button__container > div {
  box-shadow: none !important;
}

.bsf14-wrap .eventive__ticket-button__container button {
  background: #000 !important;
  border-radius: 9999px !important;
}

.bsf14-wrap .eventive__ticket-button__button button,
.bsf14-wrap .eventive__ticket-button__container button {
  color: #000 !important;
  border-radius: 9999px !important;
  border: 0 !important;
  height: auto !important;
  line-height: 1 !important;
}

.bsf14-wrap .eventive__ticket-button__button button {
  background: #000 !important;
}

.bsf14-wrap .eventive__ticket-button__button button div,
.bsf14-wrap .eventive__ticket-button__container button div {
  height: auto !important;
  line-height: 1 !important;
  background: transparent !important;
}

.bsf14-wrap .eventive__ticket-button__button button div > span,
.bsf14-wrap .eventive__ticket-button__container button div > span {
  font-family: Matter, sans-serif !important;
  font-size: 1rem !important;
  @apply sm:!text-lg;
  line-height: 1 !important;
  padding: 0.8rem 1rem !important;
  font-weight: normal !important;
  text-transform: none !important;
  color: #FFF !important;
  display: block;
}

[class*=" icon-"], [class^=icon-] {
  font-size: 12px !important;
}

.bsf14-wrap .mobile-events-dropdown .eventive__ticket-button__container button ,
.bsf14-wrap .mobile-events-dropdown .eventive__ticket-button__button button  {
  background: #FFF !important;
}

.bsf14-wrap .mobile-events-dropdown .eventive__ticket-button__button button,
.bsf14-wrap .mobile-events-dropdown .eventive__ticket-button__container button,
.bsf14-wrap .mobile-events-dropdown .eventive__ticket-button__button button div > span,
.bsf14-wrap .mobile-events-dropdown .eventive__ticket-button__container button div > span {
  color: #000 !important;
}

</style>
