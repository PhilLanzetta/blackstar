<template>
  <div>
    <Container>
      <Space :md="true" />
      <SeenArticleListing :layout="{type: 'all', category: post.id, show_issue_filter: true, show_categories: true}" />
      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>
import seo from '~/mixins/seo'
import live from '~/mixins/live'

export default {
  name: 'SeenCategory',
  mixins: [seo, live],
  layout: 'seen',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-category?slug=${params.category}`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'seen-category'
    }
  }
}
</script>

<style scoped>

</style>
