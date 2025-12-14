<template>
  <div :class="($store.state.theme==='bsf14'&&$store.state.festival.tabSettings ? ` bg-${$store.state.festival.tabSettings.background}` : '')">
    <Festival25MySchedule v-if="post" :post="post" :try-again="tryAgain" :ready="ready"  />
  </div>
</template>

<script>
import hasFestivalTabs from '~/mixins/hasFestivalTabs'
import eventiveEverywhere from '~/mixins/eventiveEverywhere'

export default {
  name: 'FestivalMySchedulePage',
  mixins: [hasFestivalTabs, eventiveEverywhere],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  head () {
    return {
      link: [
        {
          rel: 'canonical',
          href: process.env.BASE_URL + this.$options.filters.replaceSiteUrl(this.post.link)
        }
      ]
    }
  },
  computed: {
    ready () {
      return (this.$store.state.festival.loggedInLocal && this.$store.state.festival.eventiveUser && this.$store.state.festival.eventiveUser.localScheduleId && this.$store.state.festival.eventiveUser.localUserId && !this.$store.state.festival.localScheduleError)
    }
  },
  methods: {
    tryAgain () {
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
