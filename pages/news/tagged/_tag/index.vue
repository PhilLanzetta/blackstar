<template>
  <NewsArchive :total-pages="totalPages" :current-page="1" :posts="posts" :active-filter="tag" />
</template>

<script>
import seo from '~/mixins/seo'

export default {
  name: 'NewsTag',
  mixins: [seo],
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
        tag: payload.tag
      }
    }

    try {
      const tagsResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/tags?slug=${params.tag}`)
      const tags = tagsResponse.data
      if (!(tags && tags.length)) {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }
      const tag = tags[0]
      const postsResponse = await $axios.get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/posts?per_page=6&tags=${tag.id}`, $axiosConfig.config)
      const posts = postsResponse.data
      if (posts && posts.length) {
        return {
          posts,
          totalPages: parseInt(postsResponse.headers['x-wp-totalpages']),
          tag
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
  }
}
</script>

<style scoped>

</style>
