export default {
  watch: {
    '$router.path' () {
      this.$nextTick(() => {
        this.setTabs()
      })
    }
  },
  mounted () {
    this.setTabs()
  },
  created () {
    this.setTabs()
  },
  methods: {
    setTabs () {
      this.$store.commit('festival/setTabs', this.post.acf.tabs)
      this.$store.commit('festival/setTabSettings', this.post.acf.tab_settings)
      this.$store.commit('festival/setActiveTab', (this.post.acf && this.post.acf.active_tab_id ? this.post.acf.active_tab_id : this.post.id))

      this.$nextTick(() => {
        if (this.post.type === 'festival-event' && this.$store.state.festival.tabContext) {
          const match = this.$store.state.festival.tabs.find(tab => tab.permalink.includes(this.$store.state.festival.tabContext))
          if (match) {
            this.$store.commit('festival/setActiveTab', match.ID)
          }
        }
      })
    }
  }
}
