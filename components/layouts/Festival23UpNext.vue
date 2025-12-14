<template>
  <ClientOnly>
    <div class="px-4 sm:px-8 lg:px-6">
      <Festival23UpNextListings v-if="upNow&&upNow.length" :items="upNow" heading="Up now" :section-colour="sectionColour" :alt="alt" />
      <Festival23UpNextListings v-if="upNext&&upNext.length" :items="upNext" heading="Up next" :section-colour="sectionColour" :alt="alt" />
    </div>
  </ClientOnly>
</template>

<script>
import moment from 'moment-timezone'
import festival23SectionColors from '~/mixins/festival23SectionColors'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'Festival23UpNext',
  mixins: [festival23SectionColors, eventiveEverywhere],
  props: {
    alt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      upNow: [],
      upNext: []
    }
  },
  async fetch () {
    this.upNow = []
    this.upNext = []
    if (!this.$store.state.festival.eventiveUser) {
      return
    }

    if (!this.$store.state.festival.eventiveUser.localUserId) {
      return
    }
    try {
      const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/eventive-users/up-next?_schedule-user=${this.$store.state.festival.eventiveUser.localUserId}&_schedule-nonce=${this.$store.state.festival.eventiveUser.nonce}&rich=1`, this.$axiosConfig.config)
      if (response.status === 200) {
        if (response.data && response.data.length) {
          const now = moment().tz('America/New_York')

          response.data.forEach((event) => {
            const startTime = moment(event.acf.start_time)
            const endTime = moment(event.acf.end_time)

            if (now.isBetween(startTime, endTime, 'hour', '[]')) {
              this.upNow.push(event)
            } else {
              this.upNext.push(event)
            }
          })

          this.rebuildEventive()
        }
      }
    } catch (e) {
      // console.log(e)
    }
  },
  watch: {
    '$store.state.festival.saved' () {
      this.$nextTick(() => {
        this.$fetch()
      })
    }
  }
}
</script>

<style scoped>

</style>
