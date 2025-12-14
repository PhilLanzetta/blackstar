<template>
  <div>
    <template v-if="inPersonScreenings.length">
      <div class="border-t-2 border-inherit pt-5 mb-5">
        <Festival23H3 size="sm">
          In person
        </Festival23H3>
      </div>
      <Festival23EventInstance
        v-for="eventInstance in inPersonScreenings"
        :key="`inPersonScreening${eventInstance.id}`"
        :event-instance="eventInstance"
        :alt="alt"
      />
    </template>
    <template v-if="virtualScreenings.length">
      <div class="border-t-2 border-inherit pt-5 mb-5">
        <Festival23H3 size="sm">
          Virtual
        </Festival23H3>
      </div>
      <Festival23EventInstance
        v-for="eventInstance in virtualScreenings"
        :key="`virtualScreening${eventInstance.id}`"
        :event-instance="eventInstance"
        :alt="alt"
      />
    </template>
  </div>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival23FilmScreenings',
  mixins: [eventiveEverywhere],
  props: {
    inPersonScreenings: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    virtualScreenings: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
