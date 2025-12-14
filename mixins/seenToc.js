export default {
  computed: {
    showSeenTocTakeover () {
      if (!(this.$store.state.theme === 'seen' && this.$store.state.settings && this.$store.state.settings.seen && this.$store.state.settings.seen.toc_takeover.show_toc_takeover)) {
        return false
      }

      return !(this.$store.state.settings.seen.toc_takeover.toc_admin_preview && !this.$store.state.liveData)
    }
  }
}
