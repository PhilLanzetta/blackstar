export const state = () => ({
  hidden: false,
  pointer: false,
  pointerAlt: false,
  hint: false,
  hintAlt: false
})

export const mutations = {
  enter (state) {
    state.hint = false
    state.pointer = true
    state.hidden = false
  },
  leave (state) {
    state.pointer = false
    state.hintAlt = false
    state.hint = false
    state.pointerAlt = false
    state.hidden = false
  },
  enterAlt (state) {
    state.hint = false
    state.pointer = false
    state.pointerAlt = true
    state.hidden = false
  },
  leaveAlt (state) {
    state.pointer = false
    state.pointerAlt = false
    state.hint = false
    state.hintAlt = false
    state.hidden = false
  },
  hint (state, hint) {
    state.pointer = false
    state.hint = hint
    state.hintAlt = false
    state.hidden = false
  },
  hintAlt (state, hint) {
    state.pointer = false
    state.hint = hint
    state.hintAlt = true
    state.hidden = false
  },
  hide (state) {
    state.hidden = true
  },
  show (state) {
    state.hidden = false
  }
}
