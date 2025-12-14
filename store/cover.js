export const state = () => ({
  visible: false,
  seen: false,
  headerOffset: 0
})

export const mutations = {
  isVisible (state) {
    state.visible = true
  },
  isNotVisible (state) {
    state.visible = false
  },
  isSeen (state) {
    state.seen = true
  },
  setHeaderOffset (state, offset) {
    state.headerOffset = offset
  }
}
