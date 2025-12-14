<template>
  <Page v-if="post&&post.type==='page'" :post="post" />
</template>
<script>

import seo from '~/mixins/seo'
import live from '~/mixins/live'
import Page from '~/templates/Page'
import redirects from '~/mixins/redirects'

export default {
  name: 'FestivalPage',
  components: { Page },
  mixins: [seo, live, redirects],
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
      store.commit('festival/setActiveTab', payload.post.id)
      store.commit('festival/setTabs', payload.post.acf.tabs)
      store.commit('festival/setTabSettings', payload.post.acf.tab_settings)
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages?slug=festival&parent=0&per_page=1`, $axiosConfig.config)

    if (posts && posts.length) {
      const post = posts[0]
      store.commit('festival/setActiveTab', post.id)
      store.commit('festival/setTabs', post.acf.tabs)
      store.commit('festival/setTabSettings', post.acf.tab_settings)
      return { deployedObject: post }
    } else {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    }
  },
  data () {
    return {
      endpoint: 'pages',
      liveSlug: 'festival'
    }
  },
  mounted () {
    if (!this.liveObject && this.$store.state.settings && this.$store.state.settings.festival && this.$store.state.settings.festival.takeover) {
      this.$root.setLayout('default')
    }
  },
  created () {
    if (!this.liveObject && this.$store.state.settings && this.$store.state.settings.festival && this.$store.state.settings.festival.takeover) {
      this.$root.setLayout('default')
    }
  }
}
</script>
