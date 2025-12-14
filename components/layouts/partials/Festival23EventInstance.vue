<template>
  <ClientOnly>
    <div class="my-5 text-lg">
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
      <div class="mt-4 flex flex-wrap">
        <Festival23BuyButton class="my-0.5 mr-1" :post="eventInstance" :alt="alt" />
        <Festival23WatchLiveButton class="my-0.5 mr-1" :post="eventInstance" :alt="alt" />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival23EventInstance',
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
.eventive__ticket-button__button,
.eventive__ticket-button__container {
  background: transparent !important;
  box-shadow: none !important;
}

.eventive__ticket-button__container > div {
  box-shadow: none !important;
}

.eventive__ticket-button__container button {
  background: #000 !important;
}

.eventive__ticket-button__button button,
.eventive__ticket-button__container button {
  color: #000 !important;
  border-radius: 0 !important;
  border: 0 !important;
  height: auto !important;
  line-height: 1 !important;
}

.eventive__ticket-button__button button {
  background: #000 !important;
}

.eventive__ticket-button__button button div,
.eventive__ticket-button__container button div {
  height: auto !important;
  line-height: 1 !important;
  background: transparent !important;
}

.eventive__ticket-button__button button div > span,
.eventive__ticket-button__container button div > span {
  font-family: Matter, sans-serif !important;
  font-size: 1rem !important;
  line-height: 1 !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  padding-top: 1rem !important;
  padding-bottom:1rem !important;
  font-weight: normal !important;
  text-transform: none !important;
  color: #FFF !important;
  display: block;
}

[class*=" icon-"], [class^=icon-] {
  font-size: 12px !important;
}

.mobile-events-dropdown .eventive__ticket-button__container button ,
.mobile-events-dropdown .eventive__ticket-button__button button  {
  background: #FFF !important;
}

.mobile-events-dropdown .eventive__ticket-button__button button,
.mobile-events-dropdown .eventive__ticket-button__container button,
.mobile-events-dropdown .eventive__ticket-button__button button div > span,
.mobile-events-dropdown .eventive__ticket-button__container button div > span {
  color: #000 !important;
}

</style>
