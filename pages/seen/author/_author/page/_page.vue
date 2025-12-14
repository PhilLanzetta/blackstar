<template>
  <div>
    <Space :md="true"/>
    <SeenArticleListing
      :layout="{type: 'all', category: false, author: author, show_category_filter: true, show_categories: true}"
      :initial-page="parseInt($route.params.page)"
    />
    <Space :lg="true"/>
  </div>
</template>

<script>

import seo from '~/mixins/seo'

export default {
  name: 'SeenAuthorPage',
  mixins: [seo],
  layout: 'seen',
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

    try {
      let author = false
      if (payload && payload.post) {
        author = payload.post
      }

      if (!author) {
        const authors = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-author?slug=${params.author}`, $axiosConfig.config)
        if (!(authors && authors.length)) {
          error({
            statusCode: 404,
            message: 'Page not found'
          })
        }

        author = authors[0]
      }

      const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&page=${params.page}&seen-author=${author.id}`, $axiosConfig.config)

      if (!(posts && posts.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }

      return { author }
    } catch (e) {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  },
  data () {
    return {
      appendSeoTitle: ` - Page ${this.$route.params.page}`
    }
  }
}
</script>

<style scoped>

</style>
