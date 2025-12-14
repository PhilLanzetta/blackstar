<template>
  <Page v-if="post&&post.type==='page'" :post="post" />
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import Page from '~/templates/Page'
import redirects from '~/mixins/redirects'

export default {
  name: 'FestivalChildPage',
  components: { Page },
  mixins: [seo, live, redirects],
  layout: 'bsf14',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      store.commit('festival/setActiveTab', payload.post.id)
      if (payload.post && payload.post.acf) {
        store.commit('festival/setTabs', payload.post.acf.tabs)
        store.commit('festival/setTabSettings', payload.post.acf.tab_settings)
      }
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages?slug=${params.slug}&parent_slug=festival&per_page=1`, $axiosConfig.config)

    if (posts && posts.length) {
      const post = posts[0]
      if (post && post.acf) {
        store.commit('festival/setActiveTab', post.id)
        store.commit('festival/setTabs', post.acf.tabs)
        store.commit('festival/setTabSettings', post.acf.tab_settings)
      }
      return { deployedObject: post }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'pages',
      liveParent: 'festival'
    }
  }
}
</script>
