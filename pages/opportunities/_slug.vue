<template>
    <Opportunity :post="post" :type="$route.params.category"/>
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import redirects from '~/mixins/redirects'
import Opportunity from '~/templates/Opportunity'

export default {
  name: 'SingleOpportunity',
  layout: 'default',
  components: {
    Opportunity
  },
  mixins: [seo, live, redirects],
  async asyncData ({
    $axiosConfig,
    $axios,
    params,
    payload,
    error,
    store
  }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/opportunity?slug=${params.slug}&per_page=1`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  },
  data () {
    return {
      endpoint: 'opportunity'
    }
  }
}
</script>
