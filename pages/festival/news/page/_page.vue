<template>
  <div>
    <FestivalNewsArchivePage v-if="post" background="bsf13green" :post="post" :initial-page="currentPage" />
  </div>
</template>
<script>
import seo from '~/mixins/seo'
import live from '~/mixins/live'

export default {
  name: 'NewsArchive',
  mixins: [seo, live],
  layout: 'bsf14',
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
      await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-post?per_page=7&page=${params.page}&orderby=featured`, $axiosConfig.config)

      const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages?slug=news&parent_slug=festival&per_page=1`, $axiosConfig.config)

      if (posts && posts.length) {
        return { deployedObject: posts[0] }
      } else {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      }
    } catch {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  },
  data () {
    return {
      currentPage: parseInt(this.$route.params.page)
    }
  },
  head () {
    return {
      title: `Festival News - Page ${this.$route.params.page} - BlackStar Projects`
    }
  }
}
</script>
