<template>
  <div>
    <template v-if="!busy">
      <Festival24SingleEvent v-if="post" :post="post"/>
      <template v-else>
        <Festival24Section :section="{background: 'beige', layouts: [], style: 'full'}">
          <div class="border-b border-black hidden lg:block">
            <Container>
              <Space class="md:hidden"/>

              <p>
                <Festival24Button to="/festival/schedule/" :back-arrow="true">
                  Back to Schedule
                </Festival24Button>
              </p>
              <Space/>
              <Space/>
              <Space/>
            </Container>
          </div>
          <Space class="hidden lg:block"/>
          <Space/>

          <Container class="text-center">
            <Festival24SecondaryHeading :layout="{heading: 'Access denied'}"/>
            <Festival24Prose class="my-4">
              <p>Sorry you do not have access to this event.</p>
            </Festival24Prose>
            <div class="flex my-10 space-x-4 justify-center">
              <Festival24Button to="/festival/schedule">
                View Full Schedule
              </Festival24Button>
            </div>
          </Container>
        </Festival24Section>
      </template>
    </template>
    <template v-else>
      <div class="min-h-screen bg-beige">
        <Festival24Loader/>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FestivalSuppressedEvent',
  data () {
    return {
      post: null,
      busy: true
    }
  },
  async fetch () {
    this.busy = true
    const config = this.$axiosConfig.config

    if (this.$store.state.liveData && this.$store.state.liveDataNonce) {
      config.withCredentials = true
      config.headers = { 'X-WP-Nonce': this.$route.query.nonce }
    }

    if (!this.$store.state.festival.loggedInLocal) {
      this.busy = false
      return
    }

    const settings = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)

    this.$store.commit('setSettings', settings)

    if (!this.$route.query) {
      this.busy = false
      return
    }

    if (!this.$route.query.event) {
      this.busy = false
      return
    }
    try {
      const posts = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/suppressed?slug=${this.$route.query.event}&singular=1&_schedule-user=${this.$store.state.festival.eventiveUser.localUserId}&_schedule-nonce=${this.$store.state.festival.eventiveUser.nonce}`, this.$axiosConfig.config)
      if (posts && posts.length) {
        this.post = posts[0]
      }
    } catch (e) {

    }

    this.busy = false
  },
  head: {
    meta: [{
      name: 'robots',
      content: 'noindex'
    }]
  },
  watch: {
    '$store.state.festival.loggedInLocal' () {
      this.$nextTick(() => {
        this.$fetch()
      })
    }
  }
}
</script>

<style scoped>

</style>
