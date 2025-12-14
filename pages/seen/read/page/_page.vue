<template>
  <div>
    <Container>
      <Space :md="true" />
      <SeenArticleListing :layout="{type: 'all', show_issue_filter: true, show_categories: true}" :initial-page="parseInt($route.params.page)" />
      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>
export default {
  name: 'SeenReadPage',
  layout: 'seen',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    try {
      const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&page=${params.page}`, $axiosConfig.config)

      if (!(posts && posts.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }
    } catch (e) {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  },
  head () {
    return {
      title: `Seen - Page ${this.$route.params.page} - BlackStar Projects`
    }
  }
}
</script>

<style scoped>

</style>
