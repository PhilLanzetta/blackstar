export default {
  async fetch () {
    this.items = await this.$axios.$get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/sponsor?per_page=100&sponsor-collection=${this.layout.collection}&orderby=menu_order&order=asc`)
  }
}
