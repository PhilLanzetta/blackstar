<template>
  <Page id="home" v-if="post&&post.type==='page'" :post="post" />
</template>

<script>
import seo from '~/mixins/seo'
import live from '~/mixins/live'

export default {
  mixins: [seo, live],
  layout: 'default',
  async asyncData ({ $axiosConfig, $axios, store }) {
    const settings = await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)

    store.commit('setSettings', settings)

    return {
      deployedObject: await $axios.$get(`${$axiosConfig.cmsUrl}/wp-json/wp/v2/pages/2`, $axiosConfig.config)
    }
  },
  data () {
    return {
      liveSlug: 2,
      endpoint: 'pages'
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.live && this.$route.query.nonce && this.$route.query.id && (this.$route.query.post_type || this.$route.query.p)) {
      let postType = 'post'

      if (this.$route.query.post_type) {
        postType = this.$route.query.post_type
      }

      if (!this.$route.query.id || parseInt(this.$route.query.id) !== 2) {
        this.$nextTick(() => {
          this.$store.commit('cover/isSeen')
        })
      }

      this.$router.push(`/preview/${postType}?id=${this.$route.query.id}&live=${this.$route.query.live}&nonce=${this.$route.query.nonce}`)
    }
  }
}
</script>

<style>

</style>
