export default {
  methods: {
    rebuildEventive () {
      this.$nextTick(() => {
        if (typeof window !== 'undefined' && window && window.Eventive) {
          window.Eventive.on('ready', () => {
            try {
              window.Eventive.rebuild()
              const loggedIn = window.Eventive.isLoggedIn()
              if (loggedIn) {
                const newUser = window.Eventive.getPersonDetails()
                if (!this.$store.state.festival.eventiveUser || this.$store.state.festival.loggedInGuest || this.$store.state.festival.eventiveUser.email !== newUser.email) {
                  this.$store.commit('festival/setLoggedIn', newUser)
                  this.$store.dispatch('festival/getOrCreateLocalUser', true)
                }
                this.$store.commit('festival/setLoggedIn', newUser)
              } else if (!this.$store.state.festival.loggedInLocal) {
                this.$store.dispatch('festival/getOrCreateLocalUser', (this.$route && this.$route.path.includes('festival/my-schedule')))
              }
            } catch (e) {
              // console.log(e)
            }
          })
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.rebuildEventive()
    })
  }
}
