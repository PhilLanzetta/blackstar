export default {
  data () {
    return {
      totalTabs: 0,
      currentTab: 0,
      tabWidth: 0,
      tabWidthUpdated: false
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleTabWidth)
    this.handleTabWidth()

    this.$nextTick(() => {
      this.handleTabWidth()
    })
  },
  updated () {
    if (this.tabWidthUpdated) {
      return
    }

    this.$nextTick(() => {
      this.tabWidthUpdated = true
      this.handleTabWidth()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleTabWidth)
  },
  methods: {
    handleTabWidth () {
      if (!this.$refs.tabs) {
        return
      }

      this.tabWidth = this.$refs.tabs.querySelector('.tab--active').clientWidth
    },
    tabTextColour (bgColour) {
      if (bgColour === 'navy' || bgColour === 'blue' || bgColour === 'red') {
        return 'text-white'
      }

      return 'text-black'
    },
    nextTab () {
      if ((this.currentTab + 1) < this.totalTabs) {
        this.currentTab++
        return
      }

      this.currentTab = 0
    },
    prevTab () {
      if (this.currentTab > 0) {
        this.currentTab--
        return
      }

      this.currentTab = this.totalTabs - 1
    }
  }
}
