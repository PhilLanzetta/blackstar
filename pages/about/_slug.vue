<template>
  <Biography v-if="post" :post="post" />
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import redirects from '~/mixins/redirects'
import Biography from '~/templates/Biography'

export default {
  name: 'SingleBiography',
  components: {
    Biography
  },
  mixins: [seo, live, redirects],
  layout: 'default',
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

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/biography?slug=${params.slug}&has_single_page=1&per_page=1`, $axiosConfig.config)

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
      endpoint: 'biography'
    }
  }
}
</script>
