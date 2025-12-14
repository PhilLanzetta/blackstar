<template>
  <NewsArchive :posts="posts" :total-pages="totalPages" :current-page="currentPage" />
</template>
<script>
export default {
  name: 'NewsPagination',
  mixins: ['seo'],
  layout: 'default',
  async asyncData ({ $axiosConfig, $axios, params, error, payload, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    } else {
      const settings = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)
      store.commit('setSettings', settings)
    }

    try {
      const postsResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/posts?per_page=6&page=${params.page}`, $axiosConfig.config)
      const posts = postsResponse.data
      if (posts && posts.length) {
        return {
          posts,
          totalPages: parseInt(postsResponse.headers['x-wp-totalpages'])
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
  head () {
    return {
      title: `News - Page ${this.$route.params.page} - BlackStar Projects`
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
