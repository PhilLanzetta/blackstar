export default {
  mounted () {
    if (!process.client) {
      return
    }

    this.$store.commit('isNotLiveData')
    this.$store.commit('setLiveDataError', false)

    if (!(this.$route.query && this.$route.query.live && this.$route.query.nonce && this.$route.query.id)) {
      this.post = false
      this.$router.push('/')
      return
    }

    const config = this.$axiosConfig.config

    config.withCredentials = true
    config.headers = { 'X-WP-Nonce': this.$route.query.nonce }

    this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/${this.endpoint}/${this.$route.query.id}?status=draft&single${(this.endpointArgs ? this.endpointArgs : '')}`, this.$axiosConfig.config).then((response) => {
      if (response.data) {
        this.post = response.data
        this.$store.commit('isLiveData', this.$route.query.nonce)
      } else {
        this.$store.commit('setLiveDataError', true)
      }
    }).catch(() => {
      this.$store.commit('setLiveDataError', true)
    })
  }
}
