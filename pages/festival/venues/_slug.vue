<template>
  <SingleFestivalVenue v-if="post" :venue="post" />
</template>

<script>
import seo from '~/mixins/seo'
import live from '~/mixins/live'
import redirects from '~/mixins/redirects'

export default {
  name: 'FestivalVenue',
  layout: 'bsf14',
  mixins: [seo, live, redirects],
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-venues?slug=${params.slug}`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'festival-venues'
    }
  }
}
</script>
