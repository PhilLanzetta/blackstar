
<template>
  <SingleFestivalPostTemplate v-if="post" :post="post" />
</template>

<script>
import live from '~/mixins/live'
import seo from '~/mixins/seo'
import redirects from '~/mixins/redirects'

export default {
  name: 'SingleFestivalPost',
  mixins: [live, seo, redirects],
  layout: 'bsf14',
  async asyncData ({ $axiosConfig, $axios, params, payload, error, store }) {
    if (payload && payload.settings) {
      store.commit('setSettings', payload.settings)
    }

    if (payload && payload.post) {
      return { deployedObject: payload.post }
    }

    const posts = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/festival-post?slug=${params.slug}&per_page=1&singular=1`, $axiosConfig.config)

    if (posts && posts.length) {
      return { deployedObject: posts[0] }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      endpoint: 'festival-post',
      endpointArgs: '&singular=1'
    }
  },
  mounted () {
    if (this.post && this.post.acf.redirect_to && window) {
      const sanitizedRedirect = this.$options.filters.replaceSiteUrl(this.post.acf.redirect_to)
      if (sanitizedRedirect.includes(':/')) {
        window.location = this.post.acf.redirect_to
        return
      }
      this.$router.push(sanitizedRedirect)
    }
  }
}
</script>
