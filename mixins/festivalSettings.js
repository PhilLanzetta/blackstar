export default {
  data () {
    return {
      settings: null
    }
  },
  async fetch () {
    const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/festival-settings`)
    this.settings = response.data
  }
}
