<template>
  <Page v-if="post" :post="post" />
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import Page from '~/templates/Page'
import redirects from '~/mixins/redirects'

export default {
  name: 'AboutPage',
  layout: 'default',
  components: { Page },
  mixins: [seo, live, redirects],
  async asyncData ({ $axiosConfig, $axios, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages?slug=about&parent=0&per_page=1`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'pages'
    }
  }
}
</script>
