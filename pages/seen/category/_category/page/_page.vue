<template>
  <div>
    <Container>
      <Space :md="true" />
      <SeenArticleListing :layout="{type: 'all', category: category.id, show_category_filter: true, show_categories: true}" :initial-page="parseInt($route.params.page)" />
      <Space :lg="true" />
    </Container>
  </div>
</template>

<script>

import seo from '~/mixins/seo'

export default {
  name: 'SeenCategoryPage',
  layout: 'seen',
  mixins: [seo],
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    try {
      let category = false
      if (payload && payload.post) {
        category = payload.post
      }

      if (!category) {
        const categories = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-category?slug=${params.category}`, $axiosConfig.config)
        if (!(categories && categories.length)) {
          error({
            statusCode: 404,
            message: 'Page not found'
          })
        }

        category = categories[0]
      }

      const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/seen-article?per_page=6&page=${params.page}&seen-category=${category.id}`, $axiosConfig.config)

      if (!(posts && posts.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }

      return { category }
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
