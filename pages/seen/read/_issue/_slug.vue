<template>
  <SeenArticle v-if="post&&post.type==='seen-article'" :post="post" />
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import redirects from '~/mixins/redirects'
import SeenArticle from '~/templates/SeenArticle'

export default {
  name: 'SingleSeenArticle',
  layout: 'seen',
  components: { SeenArticle },
  mixins: [seo, live, redirects],
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?slug=${params.slug}&issue_name=${params.issue}&per_page=1&single`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'seen-article'
    }
  }
}
</script>
