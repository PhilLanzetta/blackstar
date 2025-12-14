<template>
  <div>
    <Festival23H2 v-if="!alt&&!hideHeading" size="md" class="mb-5">
      <span v-if="canBuyTickets">Get Tickets</span><span v-else>Details</span>
    </Festival23H2>
    <div v-if="hasInPersonEvents" :class="{'mt-8': !alt}">
      <div class="border-t-2 border-inherit pt-5 mb-5">
        <Festival23H3 size="sm">
          In person
        </Festival23H3>
      </div>
      <Festival23EventInstance v-if="!post.acf.is_virtual" key="ownInPersonEvent" :event-instance="post" :alt="alt" />

      <template v-if="inPersonEventInstances.length">
        <Festival23EventInstance
          v-for="eventInstance in inPersonEventInstances"
          :key="`inPersonInstance${eventInstance.id}`"
          :event-instance="eventInstance"
          :alt="alt"
        />
      </template>
    </div>
    <div v-if="hasVirtualEvents" :class="{'mt-8': !alt}">
      <div v-if="hasVirtualEvents" class="border-t-2 border-inherit pt-5 mb-5">
        <Festival23H3 size="sm">
          Virtual
        </Festival23H3>
      </div>

      <Festival23EventInstance v-if="post.acf.is_virtual" key="ownVirtualEvent" :event-instance="post" :alt="alt" />
      <template v-if="virtualEventInstances.length">
        <Festival23EventInstance
          v-for="eventInstance in virtualEventInstances"
          :key="`virtualInstance${eventInstance.id}`"
          :event-instance="eventInstance"
          :alt="alt"
        />
      </template>
    </div>
  </div>
</template>

<script>

import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival23EventTickets',
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
