<template>
  <div>
    <Container>
      <Space :md="true" />
      <SeenArticleListing :key="$route.fullPath" :layout="{type: 'all', show_issue_filter: true, show_categories: true}" />
      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>
import seo from '~/mixins/seo'

export default {
  name: 'SeenRead',
  mixins: [seo],
  layout: 'seen',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages?slug=read&parent_slug=seen&per_page=1`, $axiosConfig.config)

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

<style scoped>

</style>
