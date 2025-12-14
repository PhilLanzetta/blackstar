<template>
  <Page v-if="post&&post.type==='page'" :post="post" />
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import Page from '~/templates/Page'
import redirects from '~/mixins/redirects'

export default {
  name: 'ChildPage',
  components: { Page },
  mixins: [seo, live, redirects],
  layout ({ params }) {
    if (params.parent && (params.parent.includes('seen/') || params.parent === 'seen')) {
      return 'seen'
    }

    return 'default'
  },
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages?slug=${params.slug}&parent_slug=${params.parent}&per_page=1`, $axiosConfig.config)

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
