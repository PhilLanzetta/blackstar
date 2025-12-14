export const state = () => ({
  trailer: null,
  loggedIn: false,
  loggedInGuest: false,
  loggedInLocal: false,
  takeoverOpen: false,
  eventiveUser: null,
  localScheduleError: false,
  saved: [],
  tabs: null,
  activeTab: null,
  activeEvent: null,
  activeBio: null,
  loginModalOpen: false,
  helpText: null,
  downloads: null,
  externalTicketsNotice: null,
  busy: false,
  tabSettings: null,
  tabContext: null
})

export const mutations = {
  trailer(state, trailer) {
    state.trailer = trailer
  },
  setLoggedIn(state, user) {
    state.eventiveUser = (state.eventiveUser ? Object.assign(state.eventiveUser, user) : user)
    state.loggedIn = true
  },
  setLoggedInLocal(state, status) {
    state.loggedInLocal = status
  },
  openTakeover(state) {
    state.takeoverOpen = true
  },
  closeTakeover(state) {
    state.takeoverOpen = false
  },
  setLocalScheduleError(state, error) {
    state.localScheduleError = error
  },
  setSaved(state, saved) {
    if (Array.isArray(saved)) {
      state.saved = saved
    } else {
      state.saved = []
    }
  },
  setTabs(state, tabs) {
    if (Array.isArray(tabs)) {
      state.tabs = tabs
    } else {
      state.tabs = null
    }
  },
  setActiveTab(state, tabId) {
    state.activeTab = tabId
  },
  setTabContext(state, tabContext) {
    state.tabContext = tabContext
  },
  setActiveEvent(state, event) {
    state.activeEvent = event
  },
  setActiveBio(state, bioData) {
    state.activeBio = bioData
  },
  openLogin(state) {
    state.loginModalOpen = true
  },
  closeLogin(state) {
    state.loginModalOpen = false
  },
  setLoggedInGuest(state, loggedIn) {
    state.loggedInGuest = loggedIn
  },
  setHelpText(state, text = null) {
    state.helpText = text
  },
  setDownloads(state, downloads = null) {
    state.downloads = downloads
  },
  openExternalTicketsNotice(state, post) {
    state.externalTicketsNotice = post
  },
  closeExternalTicketsNotice(state) {
    state.externalTicketsNotice = false
  },
  isBusy(state) {
    state.busy = true
  },
  isNotBusy(state) {
    state.busy = false
  },
  setTabSettings(state, settings) {
    if (typeof settings === 'object') {
      state.tabSettings = settings
    } else {
      state.tabSettings = null
    }
  }
}

export const actions = {
  getOrCreateLocalUser(context, create) {
    if (context.state.busy) {
      return
    }
    context.commit('isBusy')

    const config = this.$axiosConfig.config
    config.withCredentials = true

    this.$axios.post(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/eventive-users`, {
      name: ((context.state.eventiveUser && context.state.eventiveUser.name) ? context.state.eventiveUser.name : 'Guest'),
      email: ((context.state.eventiveUser && context.state.eventiveUser.email) ? context.state.eventiveUser.email : 'guest@blackstarfest.org'),
      create
    }, config).then((response) => {
      if (response.data) {
        const user = (context.state.eventiveUser ? Object.assign({}, context.state.eventiveUser) : {})
        user.localScheduleId = response.data.schedule_id
        user.localUserId = response.data.user_id
        user.nonce = response.data.nonce
        context.commit('setLoggedInGuest', !(context.state.eventiveUser && context.state.eventiveUser.email))
        context.commit('setLocalScheduleError', false)
        context.commit('setSaved', response.data.saved)
        context.commit('setLoggedIn', user)
        context.commit('setLoggedInLocal', true)

        if (create && typeof create === 'object') {
          const config = this.$axiosConfig.config
          config.withCredentials = true
          const endpoint = `${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/eventive-users/saved`
          const args = {
            user_id: context.state.eventiveUser.localUserId,
            event_id: create.event_id,
            nonce: context.state.eventiveUser.nonce
          }

          this.$axios.post(endpoint, args, config).then((response) => {
            context.commit('setSaved', response.data.saved)

            try {
              if (response.data.saved) {
                if (response.data.saved?.includes(create.event_id)) {
                  window.Eventive.wishlist.add({
                    type: 'events',
                    id: create.eventive_id
                  })
                }
              }

              if (response.data.removed) {
                window.Eventive.wishlist.remove({
                  type: 'events',
                  id: create.eventive_id
                })
              }
            } catch (e) {
              // console.log(e.message)
            }
          }).catch(() => {
            alert('Sorry, there was an error saving the event, please try again.')
          })
        }

        try {
          const eventiveWishlist = window.Eventive.wishlist.getWishlist()
          if (eventiveWishlist && eventiveWishlist.events) {
            this.$axios.post(`${this.$axiosConfig.cmsUrl}/wp-json/blackstar/v1/eventive-users/sync-eventive-wishlist`, {
              events: eventiveWishlist.events,
              user_id: context.state.eventiveUser.localUserId,
              nonce: context.state.eventiveUser.nonce
            }, config).then((response) => {
              context.commit('setSaved', response.data.saved)

              if (response.data.saved_eventive) {
                try {
                  response.data.saved_eventive.forEach((eventive_id) => {
                    if (!eventiveWishlist.events.includes(eventive_id)) {
                      window.Eventive.wishlist.add({
                        type: 'events',
                        id: eventive_id
                      })
                    }
                  })
                } catch (e) {
                  console.log('error syncing eventive wishlist (blackstar > eventive)')
                  console.log(e)
                }
              }


            }).catch((e) => {
              console.log('error syncing eventive wishlist (eventive < blackstar)')
              console.log(e)
            })
          }
        } catch (e) {
          console.log('error syncing eventive wishlist  (eventive < blackstar)')
          console.log(e)
        }


      }
      context.commit('isNotBusy')
    }).catch((e) => {
      let message = e.message
      if (e.response && e.response.data && e.response.data.error) {
        message = e.response.data.error
      }
      context.commit('setLocalScheduleError', message)
      context.commit('setLoggedInLocal', false)
      context.commit('isNotBusy')
    })
  }

}
