<template>
  <div>
    <Festival24SecondaryHeading :layout="{'heading': 'Screenings'}" />
    <Space />
    <template v-if="inPersonScreenings.length">
      <div class="border-t border-inherit pt-5"  :class="{'border-dotted border-t-2': $store.state.theme === 'bsf14'}">
         <span
           class="px-2 py-1 text-sm border border-black rounded-md mb-2 inline-block" :class="{'bg-bsf14orangeTint': $store.state.theme === 'bsf14'}"
        >In-Person</span>
      </div>
      <Festival24EventInstance
        v-for="eventInstance in inPersonScreenings"
        :key="`inPersonScreening${eventInstance.id}`"
        :event-instance="eventInstance"
        modifier="film-guide"
        :alt="true"
      />
    </template>
    <template v-if="virtualScreenings.length">
      <div class="border-t border-inherit pt-5"  :class="{'border-dotted border-t-2': $store.state.theme === 'bsf14'}">
       <span
         class="px-2 py-1 text-sm border border-black rounded-md mb-2 inline-block bg-black text-white"  :class="{'bg-bsf14yellow !text-black': $store.state.theme === 'bsf14'}"
        >Virtual</span>
      </div>
      <Festival24EventInstance
        v-for="eventInstance in virtualScreenings"
        :key="`virtualScreening${eventInstance.id}`"
        :event-instance="eventInstance"
        modifier="film-guide"
        :alt="true"
      />
    </template>
  </div>
</template>

<script>
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival24FilmScreenings',
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
    }
  }
}
</script>

<style scoped>

</style>
