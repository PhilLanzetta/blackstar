<template>
  <div>
    <FestivalNewsArchivePage v-if="post" :post="post" />
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

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages?slug=news&parent_slug=festival&per_page=1`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  }
}
</script>
