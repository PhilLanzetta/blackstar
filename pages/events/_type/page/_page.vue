<template>
  <EventsArchive :posts="posts" :total-pages="totalPages" :current-page="currentPage" :active-filter="type" />
</template>
<script>
export default {
  name: 'EventTypePagination',
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
      const typesResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/program-type?slug=${params.type}`)
      const types = typesResponse.data
      if (!(types && types.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }

      const type = types[0]
      const postsResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/program-event?per_page=6&page=${params.page}&program-type=${type.id}`, $axiosConfig.config)
      const posts = postsResponse.data
      if (posts && posts.length) {
        return {
          posts,
          totalPages: parseInt(postsResponse.headers['x-wp-totalpages']),
          type
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
  computed: {
    currentPage () {
      return parseInt(this.$route.params.page)
    }
  }
}
</script>

<style scoped>

</style>
