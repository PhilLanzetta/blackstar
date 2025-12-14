<template>
  <div>
    <Festival24SecondaryHeading v-if="!hideHeading" :layout="{'heading': (post.acf.films&&post.acf.films.length ? 'Screenings' : 'Tickets')}" />
    <Space />
    <div v-if="hasInPersonEvents">
      <div class="border-t border-inherit pt-5"  :class="{'border-dotted border-t-2': $store.state.theme === 'bsf14'}">
        <span
          class="px-2 py-1 text-sm border border-black rounded-md mb-2 inline-block" :class="{'bg-bsf14orangeTint': $store.state.theme === 'bsf14'}"
        >In-Person</span>
      </div>
      <Festival24EventInstance v-if="!post.acf.is_virtual" key="ownInPersonEvent" :event-instance="post" :alt="alt" :modifier="modifier" />

      <template v-if="inPersonEventInstances.length">
        <Festival24EventInstance
          v-for="eventInstance in inPersonEventInstances"
          :key="`inPersonInstance${eventInstance.id}`"
          :event-instance="eventInstance"
          :alt="alt"
          :modifier="modifier"
        />
      </template>
    </div>
    <div v-if="hasVirtualEvents" :class="{'mt-8': !alt}">
      <div v-if="hasVirtualEvents" class="border-t border-inherit pt-5"   :class="{'border-dotted border-t-2': $store.state.theme === 'bsf14'}">
        <span
          class="px-2 py-1 text-sm border border-black rounded-md mb-2 inline-block bg-black text-white"  :class="{'bg-bsf14yellow !text-black': $store.state.theme === 'bsf14'}"
        >Virtual</span>
      </div>

      <Festival24EventInstance v-if="post.acf.is_virtual" key="ownVirtualEvent" :event-instance="post" :alt="alt" :modifier="modifier" />
      <template v-if="virtualEventInstances.length">
        <Festival24EventInstance
          v-for="eventInstance in virtualEventInstances"
          :key="`virtualInstance${eventInstance.id}`"
          :event-instance="eventInstance"
          :alt="alt"
          :modifier="modifier"
        />
      </template>
    </div>
  </div>
</template>

<script>

import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival24EventTickets',
  mixins: [eventiveEverywhere],
  props: {
    canBuyTickets: {
      type: Boolean,
      required: true
    },
    hasInPersonEvents: {
      type: Boolean,
      required: true
    },
    hasVirtualEvents: {
      type: Boolean,
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
    },
    hideHeading: {
      type: Boolean,
      required: false,
      default: false
    },
    inPersonEventInstances: {
      type: Array,
      required: true
    },
    virtualEventInstances: {
      type: Array,
      required: true
    },
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
