export default {
  async fetch () {
    if (this.$store.state.settings.footer_menus && !(this.$route.query && this.$route.query.live && this.$route.query.nonc)) {
      return
    }

    const settings = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/settings`)

    this.$store.commit('setSettings', settings)
  },
  data: () => {
    return {
      liveObject: null
    }
  },
  computed: {
    post () {
      if (this.liveObject) {
        return this.liveObject
      }

      if (this.deployedObject && this.deployedObject._redirect) {
        return false
      }

      return this.deployedObject
    }
  },
  mounted () {
    this.$store.commit('isNotLiveData')
    this.$store.commit('setLiveDataError', false)

    if (!process.client) {
      return
    }

    if (this.$route.query && this.$route.query.live && this.$route.query.nonce) {
      const config = this.$axiosConfig.config

      let slug = this.$route.params.slug
      let parent = this.$route.params.parent

      if (this.liveSlug) {
        slug = this.liveSlug
      }

      if (this.liveParent) {
        parent = this.liveParent
      }

      let endpointArgs = ''
      if (this.endpointArgs) {
        endpointArgs = this.endpointArgs
      }

      config.withCredentials = true
      config.headers = { 'X-WP-Nonce': this.$route.query.nonce }

      let requestUrl = `${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${this.endpoint}?slug=${slug}${(parent ? `&parent_slug=${parent}` : '&parent=0')}&per_page=1${endpointArgs}`

      if (typeof slug === 'number') {
        requestUrl = `${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${this.endpoint}/${slug}`
      }

      this.$axios.get(requestUrl, this.$axiosConfig.config).then((response) => {
        if (Array.isArray(response.data)) {
          this.liveObject = response.data[0]
        } else {
          this.liveObject = response.data
        }
        this.$store.commit('isLiveData')
        if (this.$fetch) {
          this.$fetch()
        }
      }).catch((e) => {
        this.$store.commit('setLiveDataError', true)
      })
    }
  }
}
