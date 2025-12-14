<template>
  <NewsArchive :total-pages="totalPages" :current-page="1" :posts="posts" :active-filter="year" />
</template>

<script>
export default {
  name: 'NewsYear',
  layout: 'default',
  async asyncData ({ $axiosConfig, $axios, params, error, payload, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    } else {
      const settings = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)
      store.commit('setSettings', settings)
    }

    if (payload && payload.posts) {
      return {
        posts: payload.posts,
        totalPages: payload.totalPages,
        year: payload.year
      }
    }

    try {
      const yearsResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/post-year?slug=${params.year}`)
      const years = yearsResponse.data
      if (!(years && years.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }
      const year = years[0]
      const postsResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/posts?per_page=6&post-year=${year.id}`, $axiosConfig.config)
      const posts = postsResponse.data
      if (posts && posts.length) {
        return {
          posts,
          totalPages: parseInt(postsResponse.headers['x-wp-totalpages']),
          year
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
      title: `News - Year ${this.$route.params.year} - BlackStar Projects`
    }
  }
}
</script>

<style scoped>

</style>
