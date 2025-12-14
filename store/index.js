export const state = () => ({
  scrollSnap: false,
  background: 'white',
  theme: 'default',
  megaNav: null,
  megaNavHeight: 0,
  touch: false,
  liveData: false,
  liveDataNonce: false,
  liveDataError: false,
  liveSwitch: false,
  settings: { },
  video: null,
  gallery: null
})

export const mutations = {
  enableScrollSnap (state) {
    state.scrollSnap = true
  },
  disableScrollSnap (state) {
    state.scrollSnap = false
  },
  setBackgroundColor (state, color) {
    state.background = color
  },
  setTheme (state, theme) {
    state.theme = theme
  },
  setMegaNav (state, nav) {
    state.megaNav = nav
  },
  setMegaNavHeight (state, height) {
    state.megaNavHeight = height
  },
  isTouch (state) {
    state.touch = true
  },
  isLiveData (state, nonce) {
    state.liveData = true
    if (nonce) {
      state.liveDataNonce = nonce
    }
  },
  liveSwitched (state) {
    state.liveSwitch = true
  },
  isNotLiveData (state) {
    state.liveData = false
  },
  setLiveDataError (state, error) {
    state.liveDataError = error
  },
  setSettings (state, settings) {
    state.settings = settings
  },
  setVideo (state, video) {
    state.video = video
  },
  setGallery (state, gallery) {
    state.gallery = gallery
  }
}
