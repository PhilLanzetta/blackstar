<template>
  <NewsArchive :posts="posts" :total-pages="totalPages" :current-page="currentPage" :active-filter="category" />
</template>
<script>
import seo from '~/mixins/seo'

export default {
  name: 'NewsCategoryPagination',
  mixins: [seo],
  layout: 'default',
  async asyncData ({ $axiosConfig, $axios, params, error, payload, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    } else {
      const settings = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)
      store.commit('setSettings', settings)
    }

    try {
      const categoriesResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/categories?slug=${params.category}`)
      const categories = categoriesResponse.data
      if (!(categories && categories.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }

      const category = categories[0]
      const postsResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/posts?per_page=6&page=${params.page}&categories=${category.id}`, $axiosConfig.config)
      const posts = postsResponse.data
      if (posts && posts.length) {
        return {
          posts,
          totalPages: parseInt(postsResponse.headers['x-wp-totalpages']),
          category
        }
      } else {
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
  data () {
    return {
      appendSeoTitle: ` - Page ${this.$route.params.page}`
    }
  },
  computed: {
    currentPage () {
      return parseInt(this.$route.params.page)
    }
  }
}
</script>

<style scoped>

</style>
