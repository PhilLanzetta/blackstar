export const state = () => ({
  isOpen: false,
  type: null
})

export const mutations = {
  open (state, type) {
    state.type = type
    state.isOpen = true
  },
  close (state) {
    state.isOpen = false
  }
}
