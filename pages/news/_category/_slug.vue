<template>
  <Post v-if="post" :post="post" :type="(post.categories ? post.categories[0].slug : $route.params.category)" />
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import redirects from '~/mixins/redirects'
import Post from '~/templates/Post'

export default {
  name: 'SinglePost',
  layout: 'default',
  components: { Post },
  mixins: [seo, live, redirects],
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/posts?slug=${params.slug}&category_name=${params.category}&per_page=1&single`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'posts'
    }
  }
}
</script>
