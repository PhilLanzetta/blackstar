export default {
  data () {
    return {
      page: 1,
      totalPages: 1
    }
  },
  computed: {
    itemsPerPage () {
      if (this.layout && this.layout.items_per_page) {
        return this.layout.items_per_page
      }

      return 8
    }
  },
  async fetch () {
    const response = await this.$axios.get(`${this.$axiosConfig.cmsUrl}/wp-json/wp/v2/faq?per_page=${this.itemsPerPage}&page=${this.page}&order=asc&orderby=menu_order&faq-collection=${this.layout.collection}`)
    this.items = this.items.concat(response.data)
    this.totalPages = parseInt(response.headers['x-wp-totalpages'])
  },
  methods: {
    loadMore () {
      this.page++
      this.$fetch()
    }
  }
}
