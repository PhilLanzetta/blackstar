export const state = () => ({
  isOpen: false,
  keyword: null
})

export const mutations = {
  open (state) {
    state.isOpen = true
  },
  close (state) {
    state.isOpen = false
  }
}
