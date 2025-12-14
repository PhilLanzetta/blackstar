export const state = () => ({
  tocTakeoverOpen: false,
  headerSearchOpen: false
})

export const mutations = {
  openTocTakeover (state) {
    state.tocTakeoverOpen = true
  },
  closeTocTakeover (state) {
    state.tocTakeoverOpen = false
  },
  openHeaderSearch (state) {
    state.headerSearchOpen = true
  },
  closeHeaderSearch (state) {
    state.headerSearchOpen = false
  }
}
