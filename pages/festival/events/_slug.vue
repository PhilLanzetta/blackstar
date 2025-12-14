<template>
  <div v-if="post">
    <Festival23SingleEvent v-if="parseInt(post.acf.festival_year)===2023" :post="post" />
    <Festival24SingleEvent v-else-if="parseInt(post.acf.festival_year)===2024" :post="post" />
    <Festival25SingleEvent v-else-if="parseInt(post.acf.festival_year)===2025" :post="post" />
    <SingleFestivalEvent v-else :post="post" />
  </div>
</template>

<script>
import seo from '~/mixins/seo'
import live from '~/mixins/live'
import SingleFestivalEvent from '~/templates/SingleFestivalEvent'
import redirects from '~/mixins/redirects'

export default {
  name: 'FestivalEvent',
  components: { SingleFestivalEvent },
  mixins: [seo, live, redirects],
  layout: 'bsf14',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    if (typeof window !== 'undefined') {
      $axiosConfig.config.withCredentials = true
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-event?slug=${params.slug}&per_page=1&singular=1`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'festival-event',
      endpointArgs: '&singular=1'
    }
  },
  watch: {
    '$store.state.festival.eventiveUser' (to, from) {
      if ((to && to.email) || (from && from.email)) {
        this.$nextTick(() => {
          this.$nuxt.refresh()
        })
      }
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      if (this.$store.state.festival.eventiveUser && this.$store.state.festival.eventiveUser.email) {
        this.$nuxt.refresh()
      }
    }
  }
}
</script>
